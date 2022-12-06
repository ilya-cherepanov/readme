import { Module } from '@nestjs/common';
import { GeneralModule } from '../general/general.module';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';


@Module({
  controllers: [LinkController],
  providers: [LinkService],
  imports: [GeneralModule],
})
export class LinkModule {}
