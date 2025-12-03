import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CommentsReqDTO {
  @Field(() => Int)
  postId: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}
