import { Module } from '@nestjs/common';
import { TextModule } from './text/text.module';
import { GeneralModule } from './general/general.module';
import { VideoModule } from './video/video.module';
import { PhotoModule } from './photo/photo.module';
import { QuoteModule } from './quote/quote.module';
import { LinkModule } from './link/link.module';
import { ConfigModule } from '@nestjs/config';
import envSchema from './env.schema';
import { rabbitMqOptions } from '../../config/rabbitmq.config';
import { ENV_FILE_PATH } from './posts.constants';
import { uploadFilesOptions } from 'apps/posts/config/upload-files.config';
import { jwtOptions } from '../../config/jwt.config';


@Module({
  imports: [
    GeneralModule,
    TextModule,
    PhotoModule,
    VideoModule,
    QuoteModule,
    LinkModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions, uploadFilesOptions, jwtOptions],
      validationSchema: envSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
