'use server';

import fetchGraphQL, { getPostByIdGql, getPostsGql } from '../graphql';
import { GetPostResponse, PostsResponse } from '../graphql/types/posts';
import { PaginationParams } from '../pagination';

export const fetchPosts = async ({ page, pageSize }: PaginationParams) => {
  const response = await fetchGraphQL<PostsResponse>(getPostsGql, {
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return response.data;
};

export const fetchPostById = async (id: number) => {
  const response = await fetchGraphQL<GetPostResponse>(getPostByIdGql, {
    id: id,
  });

  return response.data?.getPostById;
};
