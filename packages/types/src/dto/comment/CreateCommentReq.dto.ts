import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentReqDTO {
  @Field(() => Int)
  postId: number;

  @Field()
  content: string;
}
