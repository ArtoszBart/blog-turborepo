import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInResDTO {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  avatar: string | null;

  @Field()
  accessToken: string;
}
