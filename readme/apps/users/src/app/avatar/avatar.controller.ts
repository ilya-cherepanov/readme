import { Controller, HttpStatus, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { AVATAR_FILE_SIZE, AVATAR_FILE_TYPES } from '../user.constants';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AvatarService } from './avatar.service';
import { Request } from 'express';


@Controller('avatar')
export class AvatarController {
  constructor(
    private readonly avatarService: AvatarService,
  ) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Загружает аватар',
  })
  async uploadAvatar(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({fileType: AVATAR_FILE_TYPES})
      .addMaxSizeValidator({maxSize: AVATAR_FILE_SIZE})
      .build()
    ) file: Express.Multer.File, @Req() request: Request) {
      return this.avatarService.saveAvatar(request.user['id'], file.filename);
  }
}
