import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from './post.model';
import { PostRepository } from './post.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: PostModel.name, schema: PostSchema},
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostRepository],
  exports: [PostRepository],
})
export class PostsModule {}
