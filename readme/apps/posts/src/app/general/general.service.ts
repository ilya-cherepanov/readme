import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Post, isLinkPost, isPhotoPost, isQuotePost, isTextPost, isVideoPost, PostStatus } from '@readme/shared-types';
import { LinkPostEntity, PhotoPostEntity, PostEntity, QuotePostEntity, TextPostEntity, VideoPostEntity } from '../post.entity';
import { MAX_SEARCHED_POSTS } from '../posts.constants';
import { LikePostDTO } from './dto/like-post.dto';
import { RepostPostDTO } from './dto/repost-post.dto';
import { PostRepository } from './post.repository';
import { GetPostsQuery } from './query/get-posts.query';
import { SearchPostQuery } from './query/search-post.query';


@Injectable()
export class GeneralService {
  constructor(private readonly postRepository: PostRepository) {}

  async get(query: GetPostsQuery) {
    const skip = query.page * query.quantity;

    return this.postRepository.findAllPublished(query.quantity, skip, query.postCategory, {
      sortByPublish: query.sortByPublish,
      sortByComments: query.sortByComments,
      sortByLikes: query.sortByLikes,
    });
  }

  async getOne(id: number) {
    const post = await this.postRepository.findById(id);
    if (post.postStatus !== PostStatus.Published) {
      throw new NotFoundException('Post with given ID does not exist!');
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
      throw new NotFoundException('Post with given ID does not exist!');
    }

    if (existingPost.creatorId === userId) {
      throw new BadRequestException('User with given ID is creator of the post!');
    }

    const originalPostId = existingPost.isRePost ? existingPost.originalPostId : existingPost.id;

    if (await this.postRepository.isReposted(originalPostId, userId)) {
      throw new BadRequestException('The post has been already reposted!');
    }

    const newPost: Post = {
      ...existingPost,
      id: undefined,
      isRePost: true,
      originalPostId,
      authorId: userId,
    };

    let newPostEntity: PostEntity;

    if (isTextPost(newPost)) {
      newPostEntity = new TextPostEntity(newPost);
    } else if (isVideoPost(newPost)) {
      newPostEntity = new VideoPostEntity(newPost);
    } else if (isQuotePost(newPost)) {
      newPostEntity = new QuotePostEntity(newPost);
    } else if (isLinkPost(newPost)) {
      newPostEntity = new LinkPostEntity(newPost);
    } else if (isPhotoPost(newPost)) {
      newPostEntity = new PhotoPostEntity(newPost);
    } else {
      throw new InternalServerErrorException('Unable to determine the type of post!');
    }

    return this.postRepository.create(newPostEntity);
  }

  async setLike(postId: number, userId: string, state: boolean) {
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
      throw new NotFoundException('Post with given ID does not exist!');
    }

    if (existingPost.authorId !== userId) {
      throw new ForbiddenException('User is not an author of the post!');
    }

    await this.postRepository.destroy(id);
  }
}
