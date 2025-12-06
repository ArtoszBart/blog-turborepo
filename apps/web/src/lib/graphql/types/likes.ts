import type {
  LikePostResDTO,
  PostLikesCountResDTO,
  UnlikePostResDTO,
  UserLikedPostResDTO,
} from '@blog-turborepo/types';

export type LikePostResponse = {
  likePost: LikePostResDTO;
};

export type UnlikePostResponse = {
  unlikePost: UnlikePostResDTO;
};

export type PostLikesDataResponse = {
  postLikesCount: PostLikesCountResDTO;
  userLikedPost: UserLikedPostResDTO;
};
