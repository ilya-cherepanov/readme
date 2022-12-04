import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentsService, CommentMemoryRepository],
})
export class AppModule {}
