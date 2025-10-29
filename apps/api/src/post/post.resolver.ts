import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { type GqlRequestContext } from 'src/graphql/context';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(@Context() context: GqlRequestContext) {
    console.log('Requested by:', context.req.user);

    return this.postService.findAll();
  }
}
