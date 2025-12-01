import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
