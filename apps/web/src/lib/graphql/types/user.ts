import { User } from '@/models/User';

export type CreateUserResponse = {
  createUser?: Pick<User, 'id' | 'name'>;
  errors?: unknown;
};

export type SignInResponse = {
  signIn?: Pick<User, 'id' | 'name' | 'avatar'> & { accessToken: string };
  errors?: unknown;
};
