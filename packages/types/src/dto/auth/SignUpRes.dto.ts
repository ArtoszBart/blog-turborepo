import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUpResDTO {
  @Field(() => Int)
  id: number;
}
