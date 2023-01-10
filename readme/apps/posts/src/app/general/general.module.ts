import { Module } from '@nestjs/common';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';
import { PrismaService } from '../prisma/prisma.service';
import { PostRepository } from './post.repository';
import { RABBITMQ_SERVICE } from '../posts.constants';
import { getRabbitMqConfig } from '../../../config/rabbitmq.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '../../../config/jwt.config';
import { JWTStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    }),
  ],
  controllers: [GeneralController],
  providers: [GeneralService, PrismaService, PostRepository, JWTStrategy],
  exports: [PrismaService, PostRepository, ClientsModule, JwtModule, JWTStrategy],
})
export class GeneralModule {}
