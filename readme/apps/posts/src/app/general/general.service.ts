import { Injectable } from '@nestjs/common';
import { Post, isLinkPost, isPhotoPost, isQuotePost, isTextPost, isVideoPost } from '@readme/shared-types';
import { LinkPostEntity, PhotoPostEntity, PostEntity, QuotePostEntity, TextPostEntity, VideoPostEntity } from '../post.entity';
import { LikePostDTO } from './dto/like-post.dto';
import { RepostPostDTO } from './dto/repost-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class GeneralService {
  constructor(private readonly postRepository: PostRepository) {}

  async get() {
    return this.postRepository.findAllPublished();
  }

  async repost(dto: RepostPostDTO) {
    const existingPost = await this.postRepository.findById(dto.postId);

    if (!existingPost) {
      throw new Error('Post with given ID does not exists!');
    }

    if (existingPost.creatorId === dto.userId) {
      throw new Error('User with given ID is creator of the post!');
    }

    const originalPostId = existingPost.isRePost ? existingPost.originalPostId : existingPost.id;

    const newPost: Post = {
      ...existingPost,
      id: undefined,
      isRePost: true,
      originalPostId,
      authorId: dto.userId,
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
      throw new Error('Internal error!');
    }

    return this.postRepository.create(newPostEntity);
  }

  async setLike(dto: LikePostDTO, state: boolean) {
    if (state) {
      await this.postRepository.createLike(dto.postId, dto.userId);
    } else {
      await this.postRepository.deleteLike(dto.postId, dto.userId);
    }

    return this.postRepository.findById(dto.postId);
  }

  async delete(id: number) {
    const existingPost = this.postRepository.findById(id);

    if (!existingPost) {
      throw new Error('Post with given ID does not exists!');
    }

    await this.postRepository.destroy(id);
  }
}
