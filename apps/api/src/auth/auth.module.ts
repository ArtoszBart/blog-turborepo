import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [AuthResolver, AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
