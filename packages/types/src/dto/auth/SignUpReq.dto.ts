import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpReqDTO {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
