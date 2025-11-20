import { Post } from '@/models/Post';

export type PostsResponse = {
  posts: Post[];
  totalPosts: number;
};

export type GetPostResponse = {
  getPostById: Post;
};
