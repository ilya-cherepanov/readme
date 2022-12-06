import { Module } from '@nestjs/common';
import { GeneralModule } from '../general/general.module';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [GeneralModule],
})
export class VideoModule {}
