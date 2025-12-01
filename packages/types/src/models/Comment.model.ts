import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './Post.model';
import { User } from './User.model';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  author: User;

  @Field()
  createdAt: Date;
}
