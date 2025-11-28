import { registerAs } from '@nestjs/config';
import { GoogleConfig } from '../types/google-config';

export default registerAs(
  'googleOAuth',
  (): GoogleConfig => ({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    scope: ['email', 'profile'],
  }),
);
