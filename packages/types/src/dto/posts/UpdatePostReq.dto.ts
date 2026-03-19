import { Field, InputType, Int } from '@nestjs/graphql';
import { CreatePostReqDTO } from './CreatePostReq.dto';

@InputType()
export class UpdatePostReqDTO extends CreatePostReqDTO {
  @Field(() => Int)
  postId!: number;
}
