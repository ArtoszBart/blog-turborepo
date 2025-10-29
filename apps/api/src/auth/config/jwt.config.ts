import { registerAs } from '@nestjs/config';
import { JwtConfig } from '../types/jwt-config';
import { PeriodString } from '../types/period-string';

export default registerAs('jwt', (): JwtConfig => {
  return {
    secret: process.env.JWT_SECRET as string,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN as PeriodString,
    },
  };
});
