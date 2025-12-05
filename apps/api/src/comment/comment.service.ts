import { PrismaService } from '@/prisma/prisma.service';
import type { CommentsReqDTO } from '@blog-turborepo/types';
import { Injectable } from '@nestjs/common';
import { NewComment } from './types/NewComment';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async findByPost(data: CommentsReqDTO) {
    return await this.prisma.comment.findMany({
      where: { postId: data.postId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      skip: data.skip,
      take: data.take,
    });
  }

  async count(postId: number) {
    return await this.prisma.comment.count({ where: { postId } });
  }

  async create(newComment: NewComment) {
    return await this.prisma.comment.create({
      data: {
        content: newComment.content,
        post: { connect: { id: newComment.postId } },
        author: { connect: { id: newComment.authorId } },
      },
    });
  }
}
