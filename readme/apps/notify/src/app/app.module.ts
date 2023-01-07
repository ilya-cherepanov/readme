import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constants';
import databaseConfig from '../config/database.config';
import { mailOptions } from '../config/mail.config';
import { getMondoDbConfig } from '../config/mongodb.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import envSchema from './env.schema';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [databaseConfig, mailOptions, rabbitMqOptions],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(getMondoDbConfig()),
    MailModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
