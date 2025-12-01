import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile as GoogleProfile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import googleConfig from '../config/google.config';
import { type GoogleConfig } from '../types/google-config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleConfig.KEY) googleConfiguration: GoogleConfig,
    private readonly authService: AuthService,
  ) {
    super(googleConfiguration);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ) {
    const name = profile.name?.givenName + ' ' + profile.name?.familyName;

    return await this.authService.validateOAuthUser({
      name: name ?? profile.displayName,
      email: profile.emails![0].value,
      avatar: profile.photos?.[0].value,
    });
  }
}
