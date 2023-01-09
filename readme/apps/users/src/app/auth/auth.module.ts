import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../user.model';
import { UserRepository } from '../user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../config/jwt.config';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../user.constants';
import { getRabbitMqConfig } from '../config/rabbitmq.config';
import { MulterModule } from '@nestjs/platform-express';
import { getUploadFilesConfig } from '../config/upload-files.config';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: UserModel.name, schema: UserSchema},
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getUploadFilesConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UserRepository, JWTStrategy, JWTRefreshStrategy],
  controllers: [AuthController],
  exports: [UserRepository],
})
export class AuthModule {}
