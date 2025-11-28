import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { type Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req: { user: User }, @Res() res: Response) {
    const userData = await this.authService.login(req.user);

    const callbackUrl = new URL(
      'http://localhost:3000/api/auth/google/callback',
    );
    callbackUrl.searchParams.set('id', userData.id.toString());
    callbackUrl.searchParams.set('name', userData.name);
    callbackUrl.searchParams.set('avatar', userData.avatar ?? '');
    callbackUrl.searchParams.set('accessToken', userData.accessToken);

    res.redirect(callbackUrl.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verify() {
    return 'token verified';
  }
}
