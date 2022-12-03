import { Controller, Get } from '@nestjs/common';

import { CommentsService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: CommentsService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
