import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from './Comment.model';
import { Tag } from './Tag.model';
import { User } from './User.model';

@ObjectType()
export class Post {
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

  @Field(() => User)
  author: User;

  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => [Comment])
  comments: Comment[];
}
