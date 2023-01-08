import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostCategory, PostStatus, isQuotePost, CommandEvent } from '@readme/shared-types';
import { QuotePostEntity } from '../post.entity';
import { CreateQuotePostDTO } from './dto/create-quote-post.dto';
import { UpdateQuotePostDTO } from './dto/update-quote-post.dto';
import { PostRepository } from '../general/post.repository';
import { RABBITMQ_SERVICE } from '../posts.constants';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class QuoteService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

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

    const newPost = await this.postRepository.create(newQuotePostEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreatePost},
      {
        title: 'Пользователь опубликовал новую цитату',
        postId: newPost.id,
      },
    );

    return newPost;
  }

  async update(id: number, dto: UpdateQuotePostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException('Post with given ID does not exist!');
    }

    if (!isQuotePost(existingPost)) {
      throw new BadRequestException('Post with given ID is not quote post!');
    }

    const updatedQuotePostEntity = new QuotePostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedQuotePostEntity);
  }
}
