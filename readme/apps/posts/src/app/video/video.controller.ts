import { Body, Controller, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { PostRDO } from '../general/rdo/post.rdo';
import { CreateVideoPostDTO } from './dto/create-video-post.dto';
import { UpdateVideoPostDTO } from './dto/update-video-post.dto';
import { VideoService } from './video.service';


@ApiTags('Posts')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создана видео-публикация',
  })
  async create(@Body() dto: CreateVideoPostDTO) {
    const newVideoPost = await this.videoService.create(dto);

    return fillObject(PostRDO, newVideoPost);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Изменена видео-публикация',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVideoPostDTO) {
    const updatedVideoPost = await this.videoService.update(id, dto);

    return fillObject(PostRDO, updatedVideoPost);
  }
}
