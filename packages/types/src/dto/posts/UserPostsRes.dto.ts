import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Count {
  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  comments: number;
}

@ObjectType()
export class UserPostsResDTO {
  @Field(() => Int)
  id: number;

  @Field()
  slug: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => String, { nullable: true })
  thumbnail: string | null;

  @Field(() => Boolean)
  isPublished: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Count)
  _count: Count;
}
