import { Module } from '@nestjs/common';
import { GeneralModule } from '../general/general.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';


@Module({
  controllers: [PhotoController],
  providers: [PhotoService],
  imports: [GeneralModule],
})
export class PhotoModule {}
