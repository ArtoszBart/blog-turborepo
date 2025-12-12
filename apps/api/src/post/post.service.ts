import { PrismaService } from '@/prisma/prisma.service';
import { PostsReqDTO } from '@blog-turborepo/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination?: PostsReqDTO) {
    return await this.prisma.post.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
    });
  }

  async count(userId?: number) {
    return await this.prisma.post.count({ where: { authorId: userId } });
  }

  async findById(id: number) {
    return await this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async findByUser(userId: number, pagination?: PostsReqDTO) {
    return await this.prisma.post.findMany({
      include: {
        _count: {
          select: { comments: true, likes: true },
        },
      },
      where: { authorId: userId },
      skip: pagination?.skip,
      take: pagination?.take,
    });
  }
}
