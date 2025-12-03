import { Comment, CommentsReqDTO } from '@blog-turborepo/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
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
}
