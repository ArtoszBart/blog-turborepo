import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { type GqlRequestContext } from '@/graphql/context';
import {
  Like,
  LikePostResDTO,
  LikeReqDTO,
  PostLikesCountResDTO,
  UnlikePostResDTO,
  UserLikedPostResDTO,
} from '@blog-turborepo/types';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async likePost(
    @Context() context: GqlRequestContext,
    @Args('likeReqDTO') likeReqDTO: LikeReqDTO,
  ): Promise<LikePostResDTO> {
    const userId = context.req.user.id;
    return await this.likeService.likePost(userId, likeReqDTO.postId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async unlikePost(
    @Context() context: GqlRequestContext,
    @Args('likeReqDTO') likeReqDTO: LikeReqDTO,
  ): Promise<UnlikePostResDTO> {
    const userId = context.req.user.id;
    return await this.likeService.unlikePost(userId, likeReqDTO.postId);
  }

  @Query(() => Int)
  async postLikesCount(
    @Args('likeReqDTO') likeReqDTO: LikeReqDTO,
  ): Promise<PostLikesCountResDTO> {
    return await this.likeService.getPostLikesCount(likeReqDTO.postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  async userLikedPost(
    @Context() context: GqlRequestContext,
    @Args('likeReqDTO') likeReqDTO: LikeReqDTO,
  ): Promise<UserLikedPostResDTO> {
    const userId = context.req.user.id;
    return await this.likeService.getUserLikedPost(userId, likeReqDTO.postId);
  }
}
