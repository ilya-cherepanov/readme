import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import envSchema from './env.schema';
import { ENV_FILE_PATH } from './comments.constants';
import { MongooseModule } from '@nestjs/mongoose';
import { getMondoDbConfig } from './config/mongodb.config';
import { CommentRepository } from './comment.repository';
import { CommentModel, CommentSchema } from './comment.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig,],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(
      getMondoDbConfig()
    ),
    MongooseModule.forFeature([
      {name: CommentModel.name, schema: CommentSchema},
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository],
})
export class AppModule {}
