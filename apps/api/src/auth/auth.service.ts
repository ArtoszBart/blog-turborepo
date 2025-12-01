import { SignInReqDTO, SignUpReqDTO } from '@blog-turborepo/types';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { OAuthUser } from './types/oath-user';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateLocalUser({ email, password }: SignInReqDTO) {
    if (!password) {
      throw new BadRequestException('Password cannot be empty');
    }

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

  async signUp(signUp: SignUpReqDTO) {
    const { password, ...user } = signUp;
    const hashedPassword = await hash(password);

    return await this.userService.create({
      ...user,
      password: hashedPassword,
    });
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found!');

    const currentUser = { id: user.id };

    return currentUser;
  }

  async validateOAuthUser(oauthUser: OAuthUser) {
    const user = await this.prisma.user.findUnique({
      where: { email: oauthUser.email },
      omit: {
        password: true,
      },
    });

    if (user) return user;

    return await this.prisma.user.create({
      data: { ...oauthUser, password: '' },
      omit: {
        password: true,
      },
    });
  }
}
