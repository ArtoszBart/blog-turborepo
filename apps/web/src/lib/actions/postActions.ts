'use server';

import { transformTakeSkip } from '@/lib/pagination/transformTakeSkip';
import { Post } from '@/models/Post';
import fetchGraphQL, { getPostsGql } from '../graphql';

type PostsResponse = {
  posts: Post[];
  postCount: number;
};

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: string;
  pageSize?: string;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL<PostsResponse>(getPostsGql, { skip, take });

  return data;
};
