import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CommentsService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CommentsService],
})
export class AppModule {}
