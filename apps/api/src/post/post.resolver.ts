import {
  Post,
  PostReqDTO,
  PostResDTO,
  PostsReqDTO,
  PostsResDTO,
} from '@blog-turborepo/types';
import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { type GqlRequestContext } from 'src/graphql/context';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Context() context: GqlRequestContext,
    @Args('postsReqDTO', { nullable: true }) payload: PostsReqDTO,
  ): Promise<PostsResDTO[]> {
    console.log('Requested by:', context.req.user);

    return this.postService.findAll(payload);
  }

  // @UseGuards(JwtAuthGuard)
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
