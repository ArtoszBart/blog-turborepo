import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInReqDTO {
  @Field()
  email: string;

  @Field()
  password: string;
}
