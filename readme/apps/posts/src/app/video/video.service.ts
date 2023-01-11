import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostCategory, PostStatus, isVideoPost, CommandEvent } from '@readme/shared-types';
import { VideoPostEntity } from '../post.entity';
import { CreateVideoPostDTO } from './dto/create-video-post.dto';
import { UpdateVideoPostDTO } from './dto/update-video-post.dto';
import { PostRepository } from '../general/post.repository';
import { RABBITMQ_SERVICE } from '../posts.constants';
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
      throw new NotFoundException('Post with given ID does not exist!');
    }
    if (existingPost.creatorId !== userId) {
      throw new ForbiddenException('User is not a creator of the post');
    }
    if (!isVideoPost(existingPost)) {
      throw new BadRequestException('Post with given ID is not video post!');
    }

    const updatedVideoPostEntity = new VideoPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedVideoPostEntity);
  }
}
