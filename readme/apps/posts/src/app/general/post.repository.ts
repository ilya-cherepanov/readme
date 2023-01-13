import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@readme/core';
import { Post, PostCategory, PostStatus } from '@readme/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from '../post.entity';
import { SortingParams } from '../../../types/sorting-params.inteface';
import { MAX_SEARCHED_POSTS } from '../posts.constants';
import { SortOrder } from '../../../types/sort-order.enum';


@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, number, Post> {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<Post | null> {
    const dbPost = await this.prismaService.post.findFirst({
      where: {id},
      include: {
        _count: {
          select: {likes: true, comments: true},
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

  async findAllPublished(limit: number, skip: number, postCategory: PostCategory, tag: string, sorting: SortingParams): Promise<Post[]> {
    type QueryType = Parameters<typeof this.prismaService.post.findMany>[0];

    const query: QueryType = {
      where: {
        postStatus: PostStatus.Published,
        postCategory: postCategory,
      },
      include: {
        _count: {
          select: {likes: true, comments: true},
        },
      },
      skip,
      take: limit,
    };

    if (tag) {
      query.where = {
        ...query.where,
        tags: {
          has: tag,
        }
      };
    }

    const orderBy = [];
    if (sorting.sortByLikes) {
      orderBy.push({
        likes: {
          _count: sorting.sortByLikes,
        },
      });
    }
    if (sorting.sortByComments) {
      orderBy.push({
        comments: {
          _count: sorting.sortByComments,
        },
      });
    }
    if (sorting.sortByPublish) {
      orderBy.push({
        publishedAt: sorting.sortByPublish,
      });
    } else {
      orderBy.push({
        publishedAt: SortOrder.Descending,
      });
    }

    query.orderBy = orderBy;

    const dbPosts = await this.prismaService.post.findMany(query);
    const publishedPosts: Post[] = dbPosts.map((dbPost) => ({
      ...dbPost,
      postStatus: dbPost.postStatus as PostStatus,
      postCategory: dbPost.postCategory as PostCategory,
    }));

    return publishedPosts;
  }

  async findByTitle(title: string, limit = MAX_SEARCHED_POSTS): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        postStatus: PostStatus.Published,
        title: {
          contains: title,
        },
      },
      take: limit,
      include: {
        _count: {
          select: {likes: true, comments: true},
        },
      },
    });

    return posts as Post[];
  }


  async findDraftByUserId(userId: string): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        postStatus: PostStatus.Draft,
        authorId: userId,
      },
      include: {
        _count: {
          select: {likes: true, comments: true},
        },
      },
    });

    return posts as Post[]
  }

  async isAlreadyReposted(postId: number, userId: string): Promise<boolean> {
    const count = await this.prismaService.post.count({
      where: {
        originalPostId: postId,
        authorId: userId,
      },
    });

    return count > 0;
  }

  async countByUserId(userId: string): Promise<number> {
    return this.prismaService.post.count({
      where: {
        postStatus: PostStatus.Published,
        authorId: userId,
      },
    });
  }

  async create(item: PostEntity): Promise<Post> {
    const dbPost = await this.prismaService.post.create({
      data: item.toObject(),
      include: {
        _count: {select: {likes: true, comments: true}},
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
        _count: {select: {likes: true, comments: true}},
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
