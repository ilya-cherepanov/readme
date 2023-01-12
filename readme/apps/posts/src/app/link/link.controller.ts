import { Body, Controller, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { JWTAuthGuard } from '../general/guards/jwt-auth.guard';
import { PostRDO } from '../general/rdo/post.rdo';
import { CreateLinkPostDTO } from './dto/create-link-post.dto';
import { UpdateLinkPostDTO } from './dto/update-link-post.dto';
import { LinkService } from './link.service';
import { Request } from 'express';


@ApiTags('Posts')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.CREATED,
    description: 'Создана публикация-ссылка',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован!'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Введены не валидные данные!'
  })
  async create(@Body() dto: CreateLinkPostDTO, @Req() request: Request) {
    const newLinkPost = await this.linkService.create(request.user['id'], dto, request.user['name']);

    return fillObject(PostRDO, newLinkPost);
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
    description: 'Изменена публикация-ссылка',
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
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLinkPostDTO, @Req() request: Request) {
    const updatedLinkPost = await this.linkService.update(id, request.user['id'], dto);

    return fillObject(PostRDO, updatedLinkPost);
  }
}
