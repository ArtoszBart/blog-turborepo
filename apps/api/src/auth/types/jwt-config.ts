import { JwtModuleOptions } from '@nestjs/jwt';
import { PeriodString } from './period-string';

export type JwtConfig = Omit<JwtModuleOptions, 'secret' | 'signOptions'> & {
  secret: string;
  signOptions: Omit<
    NonNullable<JwtModuleOptions['signOptions']>,
    'expiresIn'
  > & {
    expiresIn: PeriodString;
  };
};
