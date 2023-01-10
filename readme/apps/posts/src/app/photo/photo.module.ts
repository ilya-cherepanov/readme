import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getUploadFilesConfig } from '../../../config/upload-files.config';
import { getStaticConfig } from '../../../config/static.config';
import { GeneralModule } from '../general/general.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';


@Module({
  controllers: [PhotoController],
  providers: [PhotoService],
  imports: [
    GeneralModule,
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getStaticConfig,
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getUploadFilesConfig,
      inject: [ConfigService],
    }),
  ],
})
export class PhotoModule {}
