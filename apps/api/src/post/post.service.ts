import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll({ skip, take }: { skip?: number; take?: number } = {}) {
    return await this.prisma.post.findMany({ skip, take });
  }

  async count() {
    return await this.prisma.post.count();
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
}
