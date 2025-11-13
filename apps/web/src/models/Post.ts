import { Tag } from './Tag';
import { User } from './User';

export type Post = {
  id: number;
  slug?: string;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  authorId: number;
  author: User;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};
