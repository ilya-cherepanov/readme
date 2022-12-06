import { Injectable } from '@nestjs/common';
import { PostCategory, PostStatus } from '@readme/shared-types';
import { isQuotePost } from '../../../../../libs/shared-types/src/lib/post-guards';
import { QuotePostEntity } from '../post.entity';
import { PostMemoryRepository } from '../general/post.repository';
import { CreateQuotePostDTO } from './dto/create-quote-post.dto';
import { UpdateQuotePostDTO } from './dto/update-quote-post.dto';


@Injectable()
export class QuoteService {
  constructor(private readonly postRepository: PostMemoryRepository) {}

  async create(dto: CreateQuotePostDTO) {
    const newQuotePostEntity = new QuotePostEntity({
      ...dto,
      authorId: dto.creatorId,
      createdAt: new Date(),
      postStatus: PostStatus.Published,
      publishedAt: new Date(),
      postCategory: PostCategory.Text,
      isRePost: false,
    });

    return this.postRepository.create(newQuotePostEntity);
  }

  async update(id: string, dto: UpdateQuotePostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new Error('Post with given ID does not exists');
    }

    if (!isQuotePost(existingPost)) {
      throw new Error('Post with give ID is not quote post');
    }

    const updatedQuotePostEntity = new QuotePostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedQuotePostEntity);
  }
}
