import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { GeneralModule } from '../general/general.module';
import { CommentRepository } from './comment.repository';


@Module({
  imports: [
    GeneralModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository],
})
export class CommentsModule {}
