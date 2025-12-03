import type { CommentsReqDTO } from '@blog-turborepo/types';
import fetchGraphQL, { getPostCommentsGql } from '../graphql';
import { CommentsResponse } from '../graphql/types/comments';
import { PaginationParams } from '../pagination';

type IfetchPostComments = PaginationParams & {
  postId: number;
};

export const fetchPostComments = async (props: IfetchPostComments) => {
  const response = await fetchGraphQL<CommentsResponse, CommentsReqDTO>(
    getPostCommentsGql,
    {
      postId: props.postId,
      skip: (props.page - 1) * props.pageSize,
      take: props.pageSize,
    }
  );

  return response.data;
};
