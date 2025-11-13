'use server';

import { Post } from '@/models/Post';
import fetchGraphQL, { getPostsGql } from '../graphql';

type PostsResponse = {
  posts: Post[];
};

export const fetchPosts = async () => {
  const data = await fetchGraphQL<PostsResponse>(getPostsGql);

  return data.posts;
};
