import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { type GqlRequestContext } from '@/graphql/context';
import {
  CreatePostReqDTO,
  CreatePostResDTO,
  Post,
  PostReqDTO,
  PostResDTO,
  PostsReqDTO,
  PostsResDTO,
  UserPostsResDTO,
} from '@blog-turborepo/types';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Args('postsReqDTO', { nullable: true }) payload: PostsReqDTO,
  ): Promise<PostsResDTO[]> {
    return this.postService.findAll(payload);
  }

  @Query(() => Int, { name: 'totalPosts' })
  count(): Promise<number> {
    return this.postService.count();
  }

  @Query(() => Post, { nullable: true })
  async getPostById(
    @Args('postReqDTO') payload: PostReqDTO,
  ): Promise<PostResDTO> {
    return this.postService.findById(payload.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserPostsResDTO])
  async userPosts(
    @Context() context: GqlRequestContext,
    @Args('postsReqDTO', { nullable: true }) pagination?: PostsReqDTO,
  ): Promise<UserPostsResDTO[]> {
    const userId = context.req.user.id;
    return await this.postService.findByUser(userId, pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int, { name: 'userTotalPosts' })
  userPostsCount(@Context() context: GqlRequestContext): Promise<number> {
    const userId = context.req.user.id;
    return this.postService.count(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @Context() context: GqlRequestContext,
    @Args('createPostReqDTO') data: CreatePostReqDTO,
  ): Promise<CreatePostResDTO> {
    const authorId = context.req.user.id;
    return await this.postService.create({ ...data, authorId });
  }
}
