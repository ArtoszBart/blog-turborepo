import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LikeReqDTO {
  @Field(() => Int)
  postId: number;
}

export type LikePostResDTO = boolean;
export type UnlikePostResDTO = boolean;
export type PostLikesCountResDTO = number;
export type UserLikedPostResDTO = boolean;
