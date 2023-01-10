import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostCategory, PostStatus, isPhotoPost, CommandEvent } from '@readme/shared-types';
import { PhotoPostEntity } from '../post.entity';
import { CreatePhotoPostDTO } from './dto/create-photo-post.dto';
import { UpdatePhotoPostDTO } from './dto/update-photo-post.dto';
import { PostRepository } from '../general/post.repository';
import { RABBITMQ_SERVICE } from '../posts.constants';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class PhotoService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async create(dto: CreatePhotoPostDTO) {
    const newPhotoPostEntity = new PhotoPostEntity({
      ...dto,
      authorId: dto.creatorId,
      createdAt: new Date(),
      postStatus: PostStatus.Published,
      publishedAt: new Date(),
      postCategory: PostCategory.Photo,
      isRePost: false,
    });

    const newPost = await this.postRepository.create(newPhotoPostEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreatePost},
      {
        title: 'Пользователь опубликовал новую фотографию',
        postId: newPost.id,
      },
    );

    return newPost;
  }

  async savePhoto(userId: string, filename: string) {
    const newPhotoPostEntity = new PhotoPostEntity({
      photo: filename,
      creatorId: userId,
      authorId: userId,
      createdAt: new Date(),
      postStatus: PostStatus.Published,
      publishedAt: new Date(),
      postCategory: PostCategory.Photo,
      isRePost: false,
    });

    const newPost = await this.postRepository.create(newPhotoPostEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreatePost},
      {
        title: 'Пользователь опубликовал новую фотографию',
        postId: newPost.id,
      },
    );

    return newPost;
  }

  async update(id: number, dto: UpdatePhotoPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException('Post with given ID does not exist!');
    }

    if (!isPhotoPost(existingPost)) {
      throw new BadRequestException('Post with given ID is not photo post!');
    }

    const updatedPhotoPostEntity = new PhotoPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedPhotoPostEntity);
  }
}
