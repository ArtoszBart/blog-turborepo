import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { validateEnv } from './env/env.schema';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    PrismaModule,
    PostModule,
    UserModule,
    CommentModule,
    TagModule,
    LikeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
