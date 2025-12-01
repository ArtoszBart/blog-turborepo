import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './Post.model';

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Post])
  posts: Post[];
}
