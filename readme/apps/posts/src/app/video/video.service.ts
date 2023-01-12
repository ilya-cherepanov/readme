import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostCategory, PostStatus, isVideoPost, CommandEvent } from '@readme/shared-types';
import { VideoPostEntity } from '../post.entity';
import { CreateVideoPostDTO } from './dto/create-video-post.dto';
import { UpdateVideoPostDTO } from './dto/update-video-post.dto';
import { PostRepository } from '../general/post.repository';
import { NOT_VIDEO_POST, POST_DOES_NOT_EXIST, RABBITMQ_SERVICE, USER_IS_NOT_POST_CREATOR } from '../posts.constants';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class VideoService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async create(userId: string, dto: CreateVideoPostDTO) {
    const newVideoPostEntity = new VideoPostEntity({
      ...dto,
      creatorId: userId,
      authorId: userId,
      createdAt: new Date(),
      postStatus: PostStatus.Published,
      publishedAt: new Date(),
      postCategory: PostCategory.Video,
      isRePost: false,
    });

    const newPost = await this.postRepository.create(newVideoPostEntity);

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreatePost},
      {
        title: newVideoPostEntity.title,
        postId: newPost.id,
      },
    );

    return newPost;
  }

  async update(id: number, userId: string, dto: UpdateVideoPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new NotFoundException(POST_DOES_NOT_EXIST);
    }
    if (existingPost.creatorId !== userId) {
      throw new ForbiddenException(USER_IS_NOT_POST_CREATOR);
    }
    if (!isVideoPost(existingPost)) {
      throw new BadRequestException(NOT_VIDEO_POST);
    }

    const updatedVideoPostEntity = new VideoPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedVideoPostEntity);
  }
}
