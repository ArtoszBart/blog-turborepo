import {
  SignInReqDTO,
  SignInResDTO,
  SignUpReqDTO,
  SignUpResDTO,
} from '@blog-turborepo/types';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResDTO)
  async signIn(
    @Args('signInReqDTO') signInInput: SignInReqDTO,
  ): Promise<SignInResDTO> {
    const user = await this.authService.validateLocalUser(signInInput);

    return await this.authService.login(user);
  }

  @Mutation(() => SignUpResDTO)
  async signUp(
    @Args('createUserInput') signUpInput: SignUpReqDTO,
  ): Promise<SignUpResDTO> {
    return await this.authService.signUp(signUpInput);
  }
}
