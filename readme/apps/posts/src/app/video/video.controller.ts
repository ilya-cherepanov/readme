import { Body, Controller, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { PostRDO } from '../general/rdo/post.rdo';
import { CreateVideoPostDTO } from './dto/create-video-post.dto';
import { UpdateVideoPostDTO } from './dto/update-video-post.dto';
import { VideoService } from './video.service';
import { Request } from 'express';
import { JWTAuthGuard } from '../general/guards/jwt-auth.guard';


@ApiTags('Posts')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создана видео-публикация',
  })
  async create(@Body() dto: CreateVideoPostDTO, @Req() request: Request) {
    const newVideoPost = await this.videoService.create(request.user['id'], dto);

    return fillObject(PostRDO, newVideoPost);
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
    description: 'Изменена видео-публикация',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  async update(@Param('id', ParseIntPipe) id: number, @Req() request: Request, @Body() dto: UpdateVideoPostDTO) {
    const updatedVideoPost = await this.videoService.update(id, request.user['id'], dto);

    return fillObject(PostRDO, updatedVideoPost);
  }
}
