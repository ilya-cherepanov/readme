import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostCategory, PostStatus, isLinkPost, CommandEvent } from '@readme/shared-types';
import { LinkPostEntity } from '../post.entity';
import { CreateLinkPostDTO } from './dto/create-link-post.dto';
import { UpdateLinkPostDTO } from './dto/update-link-post.dto';
import { PostRepository } from '../general/post.repository';
import { NOT_LINK_POST, POST_DOES_NOT_EXIST, RABBITMQ_SERVICE, USER_IS_NOT_POST_CREATOR } from '../posts.constants';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class LinkService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async create(userId: string, dto: CreateLinkPostDTO, userName: string) {
    const newLinkPostEntity = new LinkPostEntity({
      ...dto,
      creatorId: userId,
      authorId: userId,
      createdAt: new Date(),
      postStatus: PostStatus.Published,
      publishedAt: new Date(),
      postCategory: PostCategory.Link,
      isRePost: false,
    });

    const newPost = await this.postRepository.create(newLinkPostEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreatePost},
      {
        title: `Пользователь, ${userName} опубликовал новую ссылку`,
        postId: newPost.id,
      },
    );

    return newPost;
  }

  async update(id: number, userId: string, dto: UpdateLinkPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException(POST_DOES_NOT_EXIST);
    }
    if (existingPost.creatorId !== userId) {
      throw new ForbiddenException(USER_IS_NOT_POST_CREATOR);
    }
    if (!isLinkPost(existingPost)) {
      throw new BadRequestException(NOT_LINK_POST);
    }

    const updatedLinkPostEntity = new LinkPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedLinkPostEntity);
  }
}
