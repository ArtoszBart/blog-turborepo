import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { type GqlRequestContext } from 'src/graphql/context';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Context() context: GqlRequestContext,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    console.log('Requested by:', context.req.user);

    return this.postService.findAll({ skip, take });
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => Int, { name: 'totalPosts' })
  count() {
    return this.postService.count();
  }

  @Query(() => Post, { nullable: true })
  async getPostById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findById(id);
  }
}
