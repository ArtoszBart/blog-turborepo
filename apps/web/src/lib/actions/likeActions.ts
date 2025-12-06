'use server';

import type { LikeReqDTO } from '@blog-turborepo/types';
import { getPostLikesDataGql, likePostGql, unlikePostGql } from '../graphql';
import { authFetchGraphQL } from '../graphql/fetchGraphQL';
import {
  LikePostResponse,
  PostLikesDataResponse,
  UnlikePostResponse,
} from '../graphql/types/likes';

export const getPostLikesData = async (postId: number) => {
  const res = await authFetchGraphQL<PostLikesDataResponse, LikeReqDTO>(
    getPostLikesDataGql,
    { postId }
  );

  return res.data;
};

export const likePost = async (postId: number) => {
  const res = await authFetchGraphQL<LikePostResponse, LikeReqDTO>(
    likePostGql,
    { postId }
  );

  return res.data;
};

export const unlikePost = async (postId: number) => {
  const res = await authFetchGraphQL<UnlikePostResponse, LikeReqDTO>(
    unlikePostGql,
    { postId }
  );

  return res.data;
};
