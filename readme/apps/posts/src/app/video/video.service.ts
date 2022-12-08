import { Injectable } from '@nestjs/common';
import { PostCategory, PostStatus, isVideoPost } from '@readme/shared-types';
import { VideoPostEntity } from '../post.entity';
import { PostMemoryRepository } from '../general/post.repository';
import { CreateVideoPostDTO } from './dto/create-video-post.dto';
import { UpdateVideoPostDTO } from './dto/update-video-post.dto';


@Injectable()
export class VideoService {
  constructor(private readonly postRepository: PostMemoryRepository) {}

  async create(dto: CreateVideoPostDTO) {
    const newVideoPostEntity = new VideoPostEntity({
      ...dto,
      authorId: dto.creatorId,
      createdAt: new Date(),
      postStatus: PostStatus.Published,
      publishedAt: new Date(),
      postCategory: PostCategory.Video,
      isRePost: false,
    });

    return this.postRepository.create(newVideoPostEntity);
  }

  async update(id: string, dto: UpdateVideoPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new Error('Post with given ID does not exists');
    }

    if (!isVideoPost(existingPost)) {
      throw new Error('Post with give ID is not video post');
    }

    const updatedVideoPostEntity = new VideoPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedVideoPostEntity);
  }
}
