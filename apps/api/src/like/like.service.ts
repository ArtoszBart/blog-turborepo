import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(userId: number, postId: number) {
    try {
      const result = await this.prisma.like.create({
        data: { userId, postId },
      });

      return !!result;
    } catch (error) {
      const isPrismaError = error instanceof PrismaClientKnownRequestError;

      if (isPrismaError && error.code === 'P2002') {
        throw new BadRequestException('You have already liked this post');
      }

      throw error;
    }
  }

  async unlikePost(userId: number, postId: number) {
    try {
      const result = await this.prisma.like.delete({
        where: { userId_postId: { userId, postId } },
      });

      return !!result;
    } catch (error) {
      const isPrismaError = error instanceof PrismaClientKnownRequestError;

      if (isPrismaError && error.code === 'P2025') {
        throw new BadRequestException('Like not found');
      }

      throw error;
    }
  }

  async getPostLikesCount(postId: number) {
    return await this.prisma.like.count({ where: { postId } });
  }

  async getUserLikedPost(userId: number, postId: number) {
    const result = await this.prisma.like.findFirst({
      where: { userId, postId },
    });

    return !!result;
  }
}
