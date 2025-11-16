'use server';

import { Post } from '@/models/Post';
import fetchGraphQL, { getPostByIdGql, getPostsGql } from '../graphql';
import { PaginationParams } from '../pagination';

type PostsResponse = {
  posts: Post[];
  totalPosts: number;
};

export const fetchPosts = async ({ page, pageSize }: PaginationParams) => {
  const data = await fetchGraphQL<PostsResponse>(getPostsGql, {
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return data;
};

type GetPostResponse = {
  getPostById: Post;
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL<GetPostResponse>(getPostByIdGql, { id: id });

  return data.getPostById;
};
