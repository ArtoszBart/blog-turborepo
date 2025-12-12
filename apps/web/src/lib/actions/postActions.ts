'use server';

import type { PostReqDTO, PostsReqDTO } from '@blog-turborepo/types';
import fetchGraphQL, {
  getPostByIdGql,
  getPostsGql,
  getUserPostsGql,
} from '../graphql';
import { authFetchGraphQL } from '../graphql/fetchGraphQL';
import {
  GetPostResponse,
  PostsResponse,
  UserPostsResponse,
} from '../graphql/types/posts';
import { PaginationParams } from '../pagination';

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
    { id: id }
  );

  return response.data?.getPostById;
};

export const fetchUserPosts = async (pagination: PaginationParams) => {
  const response = await authFetchGraphQL<UserPostsResponse, PostsReqDTO>(
    getUserPostsGql,
    {
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
    }
  );

  return response.data;
};
