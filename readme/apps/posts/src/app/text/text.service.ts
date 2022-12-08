import { Injectable } from '@nestjs/common';
import { PostCategory, PostStatus, isTextPost } from '@readme/shared-types';
import { TextPostEntity } from '../post.entity';
import { PostMemoryRepository } from '../general/post.repository';
import { CreateTextPostDTO } from './dto/create-text-post.dto';
import { UpdateTextPostDTO } from './dto/update-text-post.dto';


@Injectable()
export class TextService {
  constructor(private readonly postRepository: PostMemoryRepository) {}

  async create(dto: CreateTextPostDTO) {
    const newTextPostEntity = new TextPostEntity({
      ...dto,
      authorId: dto.creatorId,
      createdAt: new Date(),
      postStatus: PostStatus.Published,
      publishedAt: new Date(),
      postCategory: PostCategory.Text,
      isRePost: false,
    });

    return this.postRepository.create(newTextPostEntity);
  }

  async update(id: string, dto: UpdateTextPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new Error('Post with given ID does not exists');
    }

    if (!isTextPost(existingPost)) {
      throw new Error('Post with give ID is not text post');
    }

    const updatedTextPostEntity = new TextPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedTextPostEntity);
  }
}
