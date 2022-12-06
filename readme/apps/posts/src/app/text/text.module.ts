import { Module } from '@nestjs/common';
import { GeneralModule } from '../general/general.module';
import { TextController } from './text.controller';
import { TextService } from './text.service';


@Module({
  controllers: [TextController],
  providers: [TextService],
  imports: [GeneralModule],
})
export class TextModule {}
