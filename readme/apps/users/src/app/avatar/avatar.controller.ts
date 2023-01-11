import { Controller, HttpStatus, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AVATAR_FILE_SIZE, AVATAR_FILE_TYPES } from '../user.constants';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AvatarService } from './avatar.service';
import { Request } from 'express';
import { fillObject } from '@readme/core';
import { UserAvatarRDO } from './rdo/user-avatar.rdo';
import { AvatarUploadDTO } from './dto/avatar-upload.dto';


@Controller('avatar')
@ApiTags('Users')
export class AvatarController {
  constructor(
    private readonly avatarService: AvatarService,
  ) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Аватар пользователя',
    type: AvatarUploadDTO,
  })
  @ApiResponse({
    type: UserAvatarRDO,
    status: HttpStatus.CREATED,
    description: 'Аватар создан',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Неверный или истекший access токен'
  })
  async uploadAvatar(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({fileType: AVATAR_FILE_TYPES})
      .addMaxSizeValidator({maxSize: AVATAR_FILE_SIZE})
      .build()
    ) file: Express.Multer.File, @Req() request: Request) {
      return fillObject(
        UserAvatarRDO,
        await this.avatarService.saveAvatar(request.user['id'], file.filename)
      );
  }
}
