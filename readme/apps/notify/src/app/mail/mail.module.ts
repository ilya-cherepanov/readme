import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { getMailConfig } from '../../config/mail.config';
import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';


@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig()),
    PostsModule,
    UsersModule,
  ],
  providers: [MailService],
  controllers: [MailController]
})
export class MailModule {}
