import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostCategory, PostStatus, isTextPost, CommandEvent } from '@readme/shared-types';
import { TextPostEntity } from '../post.entity';
import { CreateTextPostDTO } from './dto/create-text-post.dto';
import { UpdateTextPostDTO } from './dto/update-text-post.dto';
import { PostRepository } from '../general/post.repository';
import { RABBITMQ_SERVICE } from '../posts.constants';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class TextService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

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

    const newPost = await this.postRepository.create(newTextPostEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreatePost},
      {
        title: newTextPostEntity.title,
        postId: newPost.id,
      },
    );

    return newPost;
  }

  async update(id: number, dto: UpdateTextPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException('Post with given ID does not exist!');
    }

    if (!isTextPost(existingPost)) {
      throw new BadRequestException('Post with given ID is not text post!');
    }

    const updatedTextPostEntity = new TextPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedTextPostEntity);
  }
}
