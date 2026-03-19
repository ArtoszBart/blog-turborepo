import type {
  CreatePostResDTO,
  PostResDTO,
  PostsResDTO,
  UserPostsResDTO,
} from '@blog-turborepo/types';

export type PostsResponse = {
  posts: PostsResDTO[];
  totalPosts: number;
};

export type UserPostsResponse = {
  userPosts: UserPostsResDTO[];
  userTotalPosts: number;
};

export type GetPostResponse = {
  getPostById: PostResDTO;
};

export type CreatePostResponse = {
  createPost: CreatePostResDTO;
};

export type DeletePostResponse = {
  deletePost: boolean;
};
