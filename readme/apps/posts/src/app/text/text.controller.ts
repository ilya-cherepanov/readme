import { Body, Controller, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { PostRDO } from '../general/rdo/post.rdo';
import { CreateTextPostDTO } from './dto/create-text-post.dto';
import { UpdateTextPostDTO } from './dto/update-text-post.dto';
import { TextService } from './text.service';


@ApiTags('Posts')
@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создана публикация-текст',
  })
  async create(@Body() dto: CreateTextPostDTO) {
    const newTextPost = await this.textService.create(dto);

    return fillObject(PostRDO, newTextPost);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Изменена публикация-текст',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  async update(@Param('id') id: string, @Body() dto: UpdateTextPostDTO) {
    const updatedTextPost = await this.textService.update(id, dto);

    return fillObject(PostRDO, updatedTextPost);
  }
}
