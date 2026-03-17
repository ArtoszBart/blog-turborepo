import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostReqDTO {
  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => [String])
  tags!: string[];

  @Field(() => Boolean)
  isPublished!: boolean;
}
