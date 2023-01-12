import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostCategory, PostStatus, isTextPost, CommandEvent } from '@readme/shared-types';
import { TextPostEntity } from '../post.entity';
import { CreateTextPostDTO } from './dto/create-text-post.dto';
import { UpdateTextPostDTO } from './dto/update-text-post.dto';
import { PostRepository } from '../general/post.repository';
import { NOT_TEXT_POST, POST_DOES_NOT_EXIST, RABBITMQ_SERVICE, USER_IS_NOT_POST_CREATOR } from '../posts.constants';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class TextService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async create(userId: string, dto: CreateTextPostDTO) {
    const newTextPostEntity = new TextPostEntity({
      ...dto,
      creatorId: userId,
      authorId: userId,
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

  async update(id: number, userId: string, dto: UpdateTextPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException(POST_DOES_NOT_EXIST);
    }
    if (existingPost.creatorId !== userId) {
      throw new ForbiddenException(USER_IS_NOT_POST_CREATOR);
    }
    if (!isTextPost(existingPost)) {
      throw new BadRequestException(NOT_TEXT_POST);
    }

    const updatedTextPostEntity = new TextPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedTextPostEntity);
  }
}
