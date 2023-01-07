import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';


@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(dto: CreatePostDTO) {
    const newPostEntity = new PostEntity(dto);
    await this.postRepository.create(newPostEntity);
  }
}
