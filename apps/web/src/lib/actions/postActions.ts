'use server';

import type { PostReqDTO, PostsReqDTO } from '@blog-turborepo/types';
import { redirect } from 'next/navigation';
import fetchGraphQL, {
  createPostGql,
  getPostByIdGql,
  getPostsGql,
  getUserPostsGql,
} from '../graphql';
import { authFetchGraphQL } from '../graphql/fetchGraphQL';
import {
  CreatePostResponse,
  GetPostResponse,
  PostsResponse,
  UserPostsResponse,
} from '../graphql/types/posts';
import { PaginationParams } from '../pagination';
import { uploadImage } from '../uploadImage';
import { formatErrors } from '../zod/formatErrors';
import { NewPostFormDTO, NewPostSchema } from '../zod/schemas/newPostSchema';
import { FormState } from './types/FormState';

export const fetchPosts = async ({ page, pageSize }: PaginationParams) => {
  const response = await fetchGraphQL<PostsResponse, PostsReqDTO>(getPostsGql, {
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return response.data;
};

export const fetchPostById = async (id: number) => {
  const response = await fetchGraphQL<GetPostResponse, PostReqDTO>(
    getPostByIdGql,
    { id: id },
  );

  return response.data?.getPostById;
};

export const fetchUserPosts = async (pagination: PaginationParams) => {
  const response = await authFetchGraphQL<UserPostsResponse, PostsReqDTO>(
    getUserPostsGql,
    {
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
    },
  );

  return response.data;
};

export const createPost = async (
  _: unknown,
  formData: FormData,
): FormState<NewPostFormDTO> => {
  const validatedFields = NewPostSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validatedFields.success) {
    const errors = { ...formatErrors(validatedFields.error) };

    return {
      data: Object.fromEntries(formData.entries()),
      errors,
    };
  }

  const thumbnailUrl = validatedFields.data.thumbnail
    ? await uploadImage(validatedFields.data.thumbnail)
    : undefined;

  const response = await authFetchGraphQL<CreatePostResponse, NewPostFormDTO>(
    createPostGql,
    { ...validatedFields.data, thumbnail: thumbnailUrl },
  );
  if (response.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: response.errors[0].message,
    };
  }

  const post = response.data?.createPost;

  if (!post?.id || !post.slug) return redirect(`/user/posts`);
  return redirect(`/blog/${post.slug}/${post.id}`);
};
