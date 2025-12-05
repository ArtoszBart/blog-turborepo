import { User } from '@prisma/client';

export type GqlRequestContext = {
  req: Request & { user: User };
};
