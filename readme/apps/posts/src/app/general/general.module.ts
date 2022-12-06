import { Module } from '@nestjs/common';
import { PostMemoryRepository } from './post.repository';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService, PostMemoryRepository],
  exports: [PostMemoryRepository],
})
export class GeneralModule {}
