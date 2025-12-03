import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentResolver, CommentService, PrismaService],
})
export class CommentModule {}
