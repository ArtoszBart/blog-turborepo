import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  password: string | null;

  @Field(() => String, { nullable: true })
  bio: string | null;

  @Field(() => String, { nullable: true })
  avatar: string | null;

  // @Field(() => [Post])
  // posts?: Post[];

  // @Field(() => [Comment])
  // comments?: Comment[];
}
