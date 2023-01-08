import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PostRepository } from "../posts/post.repository";
import { UserRepository } from "../users/user.repository";
import { EMAIL_NEW_POSTS_SUBJECT } from "./mail.constants";


@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
    private readonly configService: ConfigService,
  ) {}

  async notifyAboutNewPosts() {
    const emails = (await this.userRepository.findAllEmails()).map((user) => user.email);
    if (emails.length === 0) {
      return;
    }

    const dbPosts = await this.postRepository.findAll();
    if (dbPosts.length === 0) {
      return;
    }

    const urlPrefix = this.configService.get<string>('mail.postUrlPrefix');
    const posts = dbPosts.map((dbPost) => ({
      title: dbPost.title,
      href: urlPrefix + dbPost.postId,
    }));

    this.mailerService.sendMail({
      to: emails,
      subject: EMAIL_NEW_POSTS_SUBJECT,
      template: './new-posts',
      context: {
        posts,
      }
    });

    this.postRepository.destroyAll();
  }
}
