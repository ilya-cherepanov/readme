import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@readme/shared-types';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @EventPattern({cmd: CommandEvent.CreatePost})
  public async createPost(dto: CreatePostDTO) {
    await this.postsService.create(dto);
  }
}
