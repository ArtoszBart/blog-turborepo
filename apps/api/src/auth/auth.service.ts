import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInInput } from './dto/sign-in.input';
import { AuthJwtPayload } from './types/auth-jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    const passwordMatched = await verify(user.password ?? '', password);
    if (!passwordMatched) throw new BadRequestException('Invalid credentials');

    return user;
  }

  private async ganarateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async login(user: User) {
    const { accessToken } = await this.ganarateToken(user.id);

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found!');

    const currentUser = { id: user.id };

    return currentUser;
  }
}
