import { Module } from '@nestjs/common';
import { GeneralModule } from '../general/general.module';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';


@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
  imports: [GeneralModule],
})
export class QuoteModule {}
