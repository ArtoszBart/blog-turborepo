'use server';

import type {
  CommentsReqDTO,
  CreateCommentReqDTO,
} from '@blog-turborepo/types';
import fetchGraphQL, { createCommentGql, getPostCommentsGql } from '../graphql';
import { authFetchGraphQL } from '../graphql/fetchGraphQL';
import { CommentsResponse } from '../graphql/types/comments';
import { PaginationParams } from '../pagination';
import { formatErrors } from '../zod/formatErrors';
import { CommentSchema } from '../zod/schemas/commentForm';
import { FormState } from './types/FormState';

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

export async function createComment(
  _: unknown,
  formData: FormData
): FormState<CreateCommentReqDTO> {
  const validatedFields = CommentSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const errors = { ...formatErrors(validatedFields.error) };

    return {
      data: Object.fromEntries(formData.entries()),
      errors,
    };
  }

  const response = await authFetchGraphQL<unknown, CreateCommentReqDTO>(
    createCommentGql,
    validatedFields.data
  );

  if (response.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: response.errors[0].message,
    };
  }

  return {
    data: Object.fromEntries(formData.entries()),
  };
}
