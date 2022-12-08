import { Injectable } from '@nestjs/common';
import { PostCategory, PostStatus, isPhotoPost } from '@readme/shared-types';
import { PhotoPostEntity } from '../post.entity';
import { PostMemoryRepository } from '../general/post.repository';
import { CreatePhotoPostDTO } from './dto/create-photo-post.dto';
import { UpdatePhotoPostDTO } from './dto/update-photo-post.dto';


@Injectable()
export class PhotoService {
  constructor(private readonly postRepository: PostMemoryRepository) {}

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

    return this.postRepository.create(newPhotoPostEntity);
  }

  async update(id: string, dto: UpdatePhotoPostDTO) {
    const existingPost = await this.postRepository.findById(id);

    if (!existingPost) {
      throw new Error('Post with given ID does not exists!');
    }

    if (!isPhotoPost(existingPost)) {
      throw new Error('Post with give ID is not photo post!');
    }

    const updatedPhotoPostEntity = new PhotoPostEntity({
      ...existingPost,
      ...dto,
    });

    return this.postRepository.update(id, updatedPhotoPostEntity);
  }
}
