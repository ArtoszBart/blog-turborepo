import type { CommentsResDTO } from '@blog-turborepo/types';

export type CommentsResponse = {
  postComments: CommentsResDTO[];
  totalPostComments: number;
};
