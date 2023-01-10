import { Body, Controller, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  // @Post()
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: 'Создана публикация-фотография',
  // })
  // async create(@Body() dto: CreatePhotoPostDTO) {
  //   const newPhotoPost = await this.photoService.create(dto);

  //   return fillObject(PostRDO, newPhotoPost);
  // }

  @Post()
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Фотография поста',
    type: PhotoUploadDTO,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создает публикация-фотографию',
  })
  async create(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({fileType: PHOTO_FILE_TYPES})
      .addMaxSizeValidator({maxSize: PHOTO_FILE_SIZE})
      .build()
    ) file: Express.Multer.File, @Req() request: Request) {
      const createdPhotoPost = await this.photoService.savePhoto(request.user['id'], file.filename);

      return fillObject(PostRDO, createdPhotoPost);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Изменяет публикация фотографию',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePhotoPostDTO) {
    const updatedPhotoPost = await this.photoService.update(id, dto);
    console.log(dto);

    return fillObject(PostRDO, updatedPhotoPost);
  }
}
