import { Post } from './Post';
import { User } from './User';

export type Comment = {
  id: number;
  content: string;
  post: Post;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};
