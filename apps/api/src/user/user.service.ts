import { SignUpReqDTO } from '@blog-turborepo/types';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userData: SignUpReqDTO) {
    try {
      return await this.prisma.user.create({
        data: userData,
        omit: {
          password: true,
        },
      });
    } catch (error) {
      const isPrismaError = error instanceof PrismaClientKnownRequestError;

      if (isPrismaError && error.code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }

      throw error;
    }
  }
}
