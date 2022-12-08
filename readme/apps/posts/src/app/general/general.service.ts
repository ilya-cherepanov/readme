import { Injectable } from '@nestjs/common';
import { Post, isLinkPost, isPhotoPost, isQuotePost, isTextPost, isVideoPost } from '@readme/shared-types';
import { LinkPostEntity, PhotoPostEntity, PostEntity, QuotePostEntity, TextPostEntity, VideoPostEntity } from '../post.entity';
import { PostMemoryRepository } from './post.repository';
import { RepostPostDTO } from './dto/repost-post.dto';

@Injectable()
export class GeneralService {
  constructor(private readonly postRepository: PostMemoryRepository) {}

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

    const originalPostId = existingPost.isRePost ? existingPost.originalPostId : existingPost._id;

    const newPost: Post = {
      ...existingPost,
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

  async delete(id: string) {
    const existingPost = this.postRepository.findById(id);

    if (!existingPost) {
      throw new Error('Post with given ID does not exists!');
    }

    await this.postRepository.destroy(id);
  }
}
