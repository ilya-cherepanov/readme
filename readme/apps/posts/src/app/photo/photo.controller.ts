import { Body, Controller, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { PostRDO } from '../general/rdo/post.rdo';
import { CreatePhotoPostDTO } from './dto/create-photo-post.dto';
import { UpdatePhotoPostDTO } from './dto/update-photo-post.dto';
import { PhotoService } from './photo.service';


@ApiTags('Posts')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создана публикация-фотография',
  })
  async create(@Body() dto: CreatePhotoPostDTO) {
    const newPhotoPost = await this.photoService.create(dto);

    return fillObject(PostRDO, newPhotoPost);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Изменена публикация-фотография',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  async update(@Param('id') id: string, @Body() dto: UpdatePhotoPostDTO) {
    const updatedPhotoPost = await this.photoService.update(id, dto);

    return fillObject(PostRDO, updatedPhotoPost);
  }
}
