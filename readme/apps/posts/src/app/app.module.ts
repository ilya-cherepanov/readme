import { Module } from '@nestjs/common';
import { TextModule } from './text/text.module';
import { GeneralModule } from './general/general.module';
import { VideoModule } from './video/video.module';
import { PhotoModule } from './photo/photo.module';
import { QuoteModule } from './quote/quote.module';
import { LinkModule } from './link/link.module';


@Module({
  imports: [
    GeneralModule,
    TextModule,
    PhotoModule,
    VideoModule,
    QuoteModule,
    LinkModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
