import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';

@Module({
  providers: [LikeResolver, LikeService, PrismaService],
})
export class LikeModule {}
