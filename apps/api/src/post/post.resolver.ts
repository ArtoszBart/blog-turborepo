import {
  Post,
  PostReqDTO,
  PostResDTO,
  PostsReqDTO,
  PostsResDTO,
} from '@blog-turborepo/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
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
}
