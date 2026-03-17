import { PrismaService } from '@/prisma/prisma.service';
import { generateSlug } from '@/utils/slug';
import { PostsReqDTO } from '@blog-turborepo/types';
import { Injectable } from '@nestjs/common';
import { NewPost } from './types/NewPost';

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

  async create(data: NewPost) {
    return await this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.isPublished,
        thumbnail: data.thumbnail,
        slug: generateSlug(data.title),
        author: { connect: { id: data.authorId } },
        tags: {
          connectOrCreate: data.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }
}
