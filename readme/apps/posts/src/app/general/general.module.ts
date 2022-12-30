import { Module } from '@nestjs/common';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';
import { PrismaService } from '../prisma/prisma.service';
import { PostRepository } from './post.repository';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService, PrismaService, PostRepository],
  exports: [PrismaService, PostRepository],
})
export class GeneralModule {}
