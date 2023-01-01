import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ENV_FILE_PATH } from './user.constants';
import databaseConfig from './config/database.config';
import envSchema from './env.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { getMondoDbConfig } from './config/mongodb.config';
import { jwtOptions } from './config/jwt.config';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions,],
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
