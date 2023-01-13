import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Post, isLinkPost, isPhotoPost, isQuotePost, isTextPost, isVideoPost, PostStatus } from '@readme/shared-types';
import { LinkPostEntity, PhotoPostEntity, PostEntity, QuotePostEntity, TextPostEntity, VideoPostEntity } from '../post.entity';
import { MAX_SEARCHED_POSTS, POST_ALREADY_REPOSTED, POST_DOES_NOT_EXIST, POST_NOT_PUBLISHED, UNKNOWN_POST_TYPE, USER_IS_NOT_AUTHOR, USER_IS_POST_CREATOR } from '../posts.constants';
import { PostRepository } from './post.repository';
import { GetPostsQuery } from './query/get-posts.query';
import { SearchPostQuery } from './query/search-post.query';


@Injectable()
export class GeneralService {
  constructor(private readonly postRepository: PostRepository) {}

  async get(query: GetPostsQuery) {
    const skip = query.page * query.quantity;

    return this.postRepository.findAllPublished(
      query.quantity,
      skip,
      query.postCategory,
      query.tag,
      {
        sortByPublish: query.sortByPublish,
        sortByComments: query.sortByComments,
        sortByLikes: query.sortByLikes,
      },
    );
  }

  async getOne(id: number) {
    const post = await this.postRepository.findById(id);
    if (post.postStatus !== PostStatus.Published) {
      throw new NotFoundException(POST_DOES_NOT_EXIST);
    }

    return post;
  }

  async search(query: SearchPostQuery) {
    return this.postRepository.findByTitle(query.title, MAX_SEARCHED_POSTS);
  }

  async getDraft(userId: string) {
    return this.postRepository.findDraftByUserId(userId);
  }

  async repost(postId: number, userId: string) {
    const existingPost = await this.postRepository.findById(postId);
    if (!existingPost) {
      throw new NotFoundException(POST_DOES_NOT_EXIST);
    }

    if (existingPost.creatorId === userId) {
      throw new BadRequestException(USER_IS_POST_CREATOR);
    }

    const originalPostId = existingPost.isRePost ? existingPost.originalPostId : existingPost.id;

    if (await this.postRepository.isAlreadyReposted(originalPostId, userId)) {
      throw new BadRequestException(POST_ALREADY_REPOSTED);
    }

    const newPost: Post = {
      ...existingPost,
      id: undefined,
      isRePost: true,
      originalPostId,
      authorId: userId,
    };

    const newPostEntity = this.createPostEntity(newPost);

    return this.postRepository.create(newPostEntity);
  }

  async setLike(postId: number, userId: string, state: boolean) {
    const post = await this.postRepository.findById(postId);

    if (post.postStatus !== PostStatus.Published) {
      throw new ForbiddenException(POST_NOT_PUBLISHED);
    }

    if (state) {
      await this.postRepository.createLike(postId, userId);
    } else {
      await this.postRepository.deleteLike(postId, userId);
    }

    return this.postRepository.findById(postId);
  }

  async delete(id: number, userId: string) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException(POST_DOES_NOT_EXIST);
    }

    if (existingPost.authorId !== userId) {
      throw new ForbiddenException(USER_IS_NOT_AUTHOR);
    }

    await this.postRepository.destroy(id);
  }

  async publishPost(id: number, userId: string, state: boolean) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException(POST_DOES_NOT_EXIST);
    }
    if (existingPost.authorId !== userId) {
      throw new ForbiddenException(USER_IS_NOT_AUTHOR);
    }

    const postEntity = this.createPostEntity(existingPost);
    if (state) {
      postEntity.postStatus = PostStatus.Published;
      postEntity.publishedAt = new Date();
    } else {
      postEntity.postStatus = PostStatus.Draft;
    }

    return this.postRepository.update(id, postEntity);
  }

  async getPostCountByUserId(userId: string) {
    const count = await this.postRepository.countByUserId(userId);

    return {
      count,
    };
  }

  private createPostEntity(post: Post): PostEntity {
    if (isTextPost(post)) {
      return new TextPostEntity(post);
    } else if (isVideoPost(post)) {
      return new VideoPostEntity(post);
    } else if (isQuotePost(post)) {
      return new QuotePostEntity(post);
    } else if (isLinkPost(post)) {
      return new LinkPostEntity(post);
    } else if (isPhotoPost(post)) {
      return new PhotoPostEntity(post);
    } else {
      throw new InternalServerErrorException(UNKNOWN_POST_TYPE);
    }
  }
}
