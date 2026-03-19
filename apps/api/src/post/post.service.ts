import { PrismaService } from '@/prisma/prisma.service';
import { generateSlug } from '@/utils/slug';
import { PostsReqDTO, UpdatePostReqDTO } from '@blog-turborepo/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await this.prisma.post.create({
          data: {
            title: data.title,
            content: data.content,
            isPublished: data.isPublished,
            thumbnail: data.thumbnail,
            slug: await this.generateUniqueSlug(data.title),
            author: { connect: { id: data.authorId } },
            tags: {
              connectOrCreate: data.tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            },
          },
        });
      } catch (error: any) {
        const isSlugDuplicated =
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2002';

        if (!isSlugDuplicated) continue;
        throw error;
      }
    }

    throw new Error('Could not generate unique slug');
  }

  async update({ userId, data }: { userId: number; data: UpdatePostReqDTO }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: data.postId, authorId: userId },
    });

    if (!authorIdMatched) throw new UnauthorizedException();

    const { postId, ...postData } = data;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await this.prisma.post.update({
          where: { id: postId },
          data: {
            ...postData,
            slug: await this.generateUniqueSlug(postData.title),
            tags: {
              set: [],
              connectOrCreate: postData.tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            },
          },
        });
      } catch (error: any) {
        const isSlugDuplicated =
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2002';

        if (!isSlugDuplicated) continue;
        throw error;
      }
    }

    throw new Error('Could not generate unique slug');
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const baseSlug = generateSlug(title);

    const existingSlugs = await this.prisma.post.findMany({
      where: {
        slug: {
          startsWith: baseSlug,
        },
      },
      select: { slug: true },
    });

    if (existingSlugs.length === 0) return baseSlug;

    const slugSet = new Set(existingSlugs.map((p) => p.slug));

    let counter = 1;
    let newSlug = `${baseSlug}-${counter}`;

    while (slugSet.has(newSlug)) {
      counter++;
      newSlug = `${baseSlug}-${counter}`;
    }

    return newSlug;
  }
}
