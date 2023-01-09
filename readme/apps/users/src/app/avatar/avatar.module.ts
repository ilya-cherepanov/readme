import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from '../auth/auth.module';
import { getStaticConfig } from '../config/static.config';
import { getUploadFilesConfig } from '../config/upload-files.config';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';


@Module({
  imports: [
    AuthModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getUploadFilesConfig,
      inject: [ConfigService],
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getStaticConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AvatarController],
  providers: [AvatarService],
})
export class AvatarModule {}
