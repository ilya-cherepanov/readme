import { Body, Controller, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { PostRDO } from '../general/rdo/post.rdo';
import { UpdatePhotoPostDTO } from './dto/update-photo-post.dto';
import { PhotoService } from './photo.service';
import { Request } from 'express';
import { PHOTO_FILE_SIZE, PHOTO_FILE_TYPES } from '../posts.constants';
import { JWTAuthGuard } from '../general/guards/jwt-auth.guard';
import { PhotoUploadDTO } from './dto/photo-upload.dto';


@ApiTags('Posts')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Фотография поста',
    type: PhotoUploadDTO,
  })
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.CREATED,
    description: 'Создает публикация-фотографию',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован!'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Введены не валидные данные!'
  })
  async create(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({fileType: PHOTO_FILE_TYPES})
      .addMaxSizeValidator({maxSize: PHOTO_FILE_SIZE})
      .build()
    ) file: Express.Multer.File, @Req() request: Request) {
      const createdPhotoPost = await this.photoService.savePhoto(request.user['id'], file.filename, request.user['name']);

      return fillObject(PostRDO, createdPhotoPost);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: 10,
  })
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.OK,
    description: 'Изменяет публикация фотографию',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован или не является создателем поста!',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Введены не валидные данные!'
  })
  async update(@Param('id', ParseIntPipe) id: number, @Req() request: Request, @Body() dto: UpdatePhotoPostDTO) {
    const updatedPhotoPost = await this.photoService.update(id, request.user['id'], dto);

    return fillObject(PostRDO, updatedPhotoPost);
  }
}
