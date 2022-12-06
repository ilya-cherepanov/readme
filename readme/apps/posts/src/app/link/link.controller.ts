import { Body, Controller, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { PostRDO } from '../general/rdo/post.rdo';
import { CreateLinkPostDTO } from './dto/create-link-post.dto';
import { UpdateLinkPostDTO } from './dto/update-link-post.dto';
import { LinkService } from './link.service';


@ApiTags('Posts')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создана публикация-ссылка',
  })
  async create(@Body() dto: CreateLinkPostDTO) {
    const newLinkPost = await this.linkService.create(dto);

    return fillObject(PostRDO, newLinkPost);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Изменена публикация-ссылка',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  async update(@Param('id') id: string, @Body() dto: UpdateLinkPostDTO) {
    const updatedLinkPost = await this.linkService.update(id, dto);

    return fillObject(PostRDO, updatedLinkPost);
  }
}
