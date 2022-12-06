import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { RepostPostDTO } from './dto/repost-post.dto';
import { GeneralService } from './general.service';
import { PostRDO } from './rdo/post.rdo';


@ApiTags('Posts')
@Controller('')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get('')
  @ApiResponse({
    type: [PostRDO],
    status: HttpStatus.OK,
    description: 'Получить опубликованные посты'
  })
  async getPosts() {
    const posts = await this.generalService.get();

    return fillObject(PostRDO, posts);
  }

  @Post('repost')
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.OK,
    description: 'Сделать репост',
  })
  async repost(@Body() dto: RepostPostDTO) {
    const repostedPost = await this.generalService.repost(dto);

    return fillObject(PostRDO, repostedPost);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удалить пост по ID'
  })
  async deletePost(@Param('id') id: string) {
    await this.generalService.delete(id);
  }
}
