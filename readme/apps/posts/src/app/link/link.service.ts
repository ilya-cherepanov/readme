import { Injectable } from '@nestjs/common';
import { PostCategory, PostStatus, isLinkPost } from '@readme/shared-types';
import { LinkPostEntity } from '../post.entity';
import { CreateLinkPostDTO } from './dto/create-link-post.dto';
import { UpdateLinkPostDTO } from './dto/update-link-post.dto';
import { PostRepository } from '../general/post.repository';


@Injectable()
export class LinkService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(dto: CreateLinkPostDTO) {
    const newLinkPostEntity = new LinkPostEntity({
      ...dto,
      authorId: dto.creatorId,
      createdAt: new Date(),
      postStatus: PostStatus.Published,
      publishedAt: new Date(),
      postCategory: PostCategory.Text,
      isRePost: false,
    });

    return this.postRepository.create(newLinkPostEntity);
  }

  async update(id: number, dto: UpdateLinkPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new Error('Post with given ID does not exists');
    }

    if (!isLinkPost(existingPost)) {
      throw new Error('Post with give ID is not link post');
    }

    const updatedLinkPostEntity = new LinkPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedLinkPostEntity);
  }
}
