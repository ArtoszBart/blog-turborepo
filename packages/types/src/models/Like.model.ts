import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './Post.model';
import { User } from './User.model';

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  user: User;
}
