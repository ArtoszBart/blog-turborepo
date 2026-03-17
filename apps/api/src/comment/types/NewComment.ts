import type { CreateCommentReqDTO } from '@blog-turborepo/types';

export type NewComment = CreateCommentReqDTO & {
  authorId: number;
};
