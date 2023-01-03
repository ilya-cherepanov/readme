import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { LikePostDTO } from './dto/like-post.dto';
import { RepostPostDTO } from './dto/repost-post.dto';
import { GeneralService } from './general.service';
import { GetPostsQuery } from './query/get-posts.query';
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
  async getPosts(@Query() query: GetPostsQuery) {
    const posts = await this.generalService.get(query);

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
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удалить пост по ID'
  })
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    await this.generalService.delete(id);
  }

  @Post('like/:state')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'state',
    description: 'Состояние лайка',
    example: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Установить лайк',
  })
  async setLike(@Body() dto: LikePostDTO, @Param('state', ParseBoolPipe) state: boolean) {
    const likedPost = await this.generalService.setLike(dto, state);

    return fillObject(PostRDO, likedPost);
  }
}
