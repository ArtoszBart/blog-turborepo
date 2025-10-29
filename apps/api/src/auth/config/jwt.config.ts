import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { PeriodString } from '../types/period-string';

export default registerAs('jwt', (): JwtModuleOptions => {
  return {
    secret: process.env.JWT_SECRET as string,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN as PeriodString,
    },
  };
});
