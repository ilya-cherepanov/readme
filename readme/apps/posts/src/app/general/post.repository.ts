import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@readme/core';
import { Post, PostCategory, PostStatus } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from '../post.entity';
import { SortingParams } from '../types/sorting-params.inteface';


@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, number, Post> {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<Post | null> {
    const dbPost = await this.prismaService.post.findFirst({
      where: {id},
      include: {
        _count: {
          select: {likes: true},
        },
      },
    });

    if (!dbPost) {
      return null;
    }

    const post = {
      ...dbPost,
      postStatus: dbPost.postStatus as PostStatus,
      postCategory: dbPost.postCategory as PostCategory,
    };

    return post;
  }

  async findAllPublished(limit: number, skip: number, sorting: SortingParams): Promise<Post[]> {
    type QueryType = Parameters<typeof this.prismaService.post.findMany>[0];

    const query: QueryType = {
      where: {postStatus: PostStatus.Published},
      include: {
        _count: {
          select: {likes: true},
        },
      },
      orderBy: {
        publishedAt: sorting.sortByPublish,
      },
      skip,
      take: limit,
    };

    if (sorting.sortByLikes) {
      query.orderBy = [
        {
          likes: {
            _count: sorting.sortByLikes,
          },
        },
        {
          publishedAt: sorting.sortByPublish,
        },
      ];
    }

    const dbPosts = await this.prismaService.post.findMany(query);
    const publishedPosts: Post[] = dbPosts.map((dbPost) => ({
      ...dbPost,
      postStatus: dbPost.postStatus as PostStatus,
      postCategory: dbPost.postCategory as PostCategory,
    }));

    return publishedPosts;
  }

  async create(item: PostEntity): Promise<Post> {
    const dbPost = await this.prismaService.post.create({
      data: item.toObject(),
      include: {
        _count: {select: {likes: true}},
      },
    });

    return {
      ...dbPost,
      postStatus: dbPost.postStatus as PostStatus,
      postCategory: dbPost.postCategory as PostCategory,
    };
  }

  async update(id: number, item: PostEntity): Promise<Post> {
    const dbPost = await this.prismaService.post.update({
      where: {id},
      data: {...item.toObject()},
      include: {
        _count: {select: {likes: true}},
      },
    });

    return {
      ...dbPost,
      postStatus: dbPost.postStatus as PostStatus,
      postCategory: dbPost.postCategory as PostCategory,
    };
  }

  async destroy(id: number): Promise<void> {
    await this.prismaService.post.delete({where: {id}});
  }

  async createLike(postId: number, userId: string): Promise<void> {
    await this.prismaService.like.upsert({
      where: {postId_userId: {postId, userId}},
      create: {postId, userId},
      update: {postId, userId},
    });
  }

  async deleteLike(postId: number, userId: string): Promise<void> {
    await this.prismaService.like.deleteMany({where: {postId, userId}});
  }
}
