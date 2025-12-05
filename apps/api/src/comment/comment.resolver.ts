import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { type GqlRequestContext } from '@/graphql/context';
import {
  Comment,
  CommentsReqDTO,
  CreateCommentReqDTO,
} from '@blog-turborepo/types';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  postComments(@Args('commentsReqDTO') commentsReqDTO: CommentsReqDTO) {
    return this.commentService.findByPost(commentsReqDTO);
  }

  @Query(() => Int)
  totalPostComments(@Args('commentsReqDTO') { postId }: CommentsReqDTO) {
    return this.commentService.count(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  createComment(
    @Context() context: GqlRequestContext,
    @Args('createCommentReqDTO') data: CreateCommentReqDTO,
  ) {
    const authorId = context.req.user.id;
    return this.commentService.create({ ...data, authorId });
  }
}
