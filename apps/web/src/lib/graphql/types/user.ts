import { User } from '@/models/User';

export type CreateUserResponse = {
  createUser?: Pick<User, 'id' | 'name'>;
  errors: unknown;
};
