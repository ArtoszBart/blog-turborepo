import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PostReqDTO {
  @Field(() => Int)
  id: number;
}
