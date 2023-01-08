import { Module } from '@nestjs/common';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';
import { PrismaService } from '../prisma/prisma.service';
import { PostRepository } from './post.repository';
import { RABBITMQ_SERVICE } from '../posts.constants';
import { getRabbitMqConfig } from 'apps/posts/config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';


@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [GeneralController],
  providers: [GeneralService, PrismaService, PostRepository],
  exports: [PrismaService, PostRepository, ClientsModule],
})
export class GeneralModule {}
