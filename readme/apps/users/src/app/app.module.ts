import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ENV_FILE_PATH } from './user.constants';
import databaseConfig from './config/database.config';
import envSchema from './env.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { getMondoDbConfig } from './config/mongodb.config';
import { jwtOptions } from './config/jwt.config';
import { rabbitMqOptions } from './config/rabbitmq.config';
import { uploadFilesOptions } from './config/upload-files.config';
import { AvatarModule } from './avatar/avatar.module';
import { postServiceOptions } from './config/post-service.config';


@Module({
  imports: [
    AuthModule,
    AvatarModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [
        databaseConfig,
        jwtOptions,
        rabbitMqOptions,
        uploadFilesOptions,
        postServiceOptions,
      ],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(
      getMondoDbConfig()
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
