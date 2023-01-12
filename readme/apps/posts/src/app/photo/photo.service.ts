import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostCategory, PostStatus, isPhotoPost, CommandEvent } from '@readme/shared-types';
import { PhotoPostEntity } from '../post.entity';
import { CreatePhotoPostDTO } from './dto/create-photo-post.dto';
import { UpdatePhotoPostDTO } from './dto/update-photo-post.dto';
import { PostRepository } from '../general/post.repository';
import { NOT_PHOTO_POST, POST_DOES_NOT_EXIST, RABBITMQ_SERVICE, USER_IS_NOT_POST_CREATOR } from '../posts.constants';
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
        title: `Пользователь опубликовал новую фотографию`,
        postId: newPost.id,
      },
    );

    return newPost;
  }

  async savePhoto(userId: string, filename: string, userName: string) {
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
        title: `Пользователь, ${userName} опубликовал новую фотографию`,
        postId: newPost.id,
      },
    );

    return newPost;
  }

  async update(id: number, userId: string, dto: UpdatePhotoPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException(POST_DOES_NOT_EXIST);
    }
    if (existingPost.creatorId !== userId) {
      throw new ForbiddenException(USER_IS_NOT_POST_CREATOR);
    }
    if (!isPhotoPost(existingPost)) {
      throw new BadRequestException(NOT_PHOTO_POST);
    }

    const updatedPhotoPostEntity = new PhotoPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedPhotoPostEntity);
  }
}
