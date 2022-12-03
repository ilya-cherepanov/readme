import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  getData(): { message: string } {
    return { message: 'Welcome to comments!' };
  }
}
