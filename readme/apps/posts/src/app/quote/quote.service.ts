import { Injectable } from '@nestjs/common';
import { PostCategory, PostStatus, isQuotePost } from '@readme/shared-types';
import { QuotePostEntity } from '../post.entity';
import { CreateQuotePostDTO } from './dto/create-quote-post.dto';
import { UpdateQuotePostDTO } from './dto/update-quote-post.dto';
import { PostRepository } from '../general/post.repository';


@Injectable()
export class QuoteService {
  constructor(private readonly postRepository: PostRepository) {}

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

  async update(id: number, dto: UpdateQuotePostDTO) {
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
