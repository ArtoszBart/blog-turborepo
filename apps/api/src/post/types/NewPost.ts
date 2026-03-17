import { CreatePostReqDTO } from '@blog-turborepo/types';

export type NewPost = CreatePostReqDTO & {
  authorId: number;
};
