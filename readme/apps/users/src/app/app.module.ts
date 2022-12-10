import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ENV_FILE_PATH } from './user.constants';
import databaseConfig from './config/database.config';
import envSchema from './env.schema';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig,],
      validationSchema: envSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
