import { Body, Controller, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { JWTAuthGuard } from '../general/guards/jwt-auth.guard';
import { PostRDO } from '../general/rdo/post.rdo';
import { CreateTextPostDTO } from './dto/create-text-post.dto';
import { UpdateTextPostDTO } from './dto/update-text-post.dto';
import { TextService } from './text.service';
import { Request } from 'express';


@ApiTags('Posts')
@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создана публикация-текст',
  })
  async create(@Body() dto: CreateTextPostDTO, @Req() request: Request) {
    const newTextPost = await this.textService.create(request.user['id'], dto);

    return fillObject(PostRDO, newTextPost);
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
    description: 'Изменена публикация-текст',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  async update(@Param('id', ParseIntPipe) id: number, @Req() request: Request, @Body() dto: UpdateTextPostDTO) {
    const updatedTextPost = await this.textService.update(id, request.user['id'], dto);

    return fillObject(PostRDO, updatedTextPost);
  }
}
