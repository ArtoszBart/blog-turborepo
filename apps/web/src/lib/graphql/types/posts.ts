import type { PostResDTO, PostsResDTO } from '@blog-turborepo/types';

export type PostsResponse = {
  posts: PostsResDTO[];
  totalPosts: number;
};

export type GetPostResponse = {
  getPostById: PostResDTO;
};
