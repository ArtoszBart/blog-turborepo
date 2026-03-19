import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeletePostReqDTO {
  @Field(() => Int)
  postId!: number;
}
