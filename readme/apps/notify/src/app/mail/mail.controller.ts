import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { MailService } from "./mail.service";


@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Отправляет письма с уведомлениями о новых публикациях зарегистрированным пользователям'
  })
  async sendMails() {
    await this.mailService.notifyAboutNewPosts();
  }
}
