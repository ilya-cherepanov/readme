import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostCategory, PostStatus, isLinkPost, CommandEvent } from '@readme/shared-types';
import { LinkPostEntity } from '../post.entity';
import { CreateLinkPostDTO } from './dto/create-link-post.dto';
import { UpdateLinkPostDTO } from './dto/update-link-post.dto';
import { PostRepository } from '../general/post.repository';
import { RABBITMQ_SERVICE } from '../posts.constants';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class LinkService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

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

    const newPost = await this.postRepository.create(newLinkPostEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreatePost},
      {
        title: 'Пользователь опубликовал новую ссылку',
        postId: newPost.id,
      },
    );

    return newPost;
  }

  async update(id: number, dto: UpdateLinkPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException('Post with given ID does not exist!');
    }

    if (!isLinkPost(existingPost)) {
      throw new BadRequestException('Post with given ID is not link post!');
    }

    const updatedLinkPostEntity = new LinkPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedLinkPostEntity);
  }
}
