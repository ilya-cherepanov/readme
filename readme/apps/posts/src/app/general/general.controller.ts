import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { Request } from 'express';
import { GeneralService } from './general.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { GetPostsQuery } from './query/get-posts.query';
import { SearchPostQuery } from './query/search-post.query';
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

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: 10,
  })
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.OK,
    description: 'Получить один опубликованный пост'
  })
  async getPost(@Param('id', ParseIntPipe) id: number) {
    const post = await this.generalService.getOne(id);
    console.log(post);

    return fillObject(PostRDO, post);
  }

  @Get('search')
  @ApiResponse({
    type: [PostRDO],
    status: HttpStatus.OK,
    description: 'Ищет опубликованный посты по названию'
  })
  async search(@Query() query: SearchPostQuery) {
    const posts = await this.generalService.search(query);

    return fillObject(PostRDO, posts);
  }

  @Get('draft')
  @UseGuards(JWTAuthGuard)
  @ApiResponse({
    type: [PostRDO],
    status: HttpStatus.OK,
    description: 'Получает посты-черновики'
  })
  async getDraft(@Req() request: Request) {
    const posts = await this.getDraft(request.user['id']);

    return fillObject(PostRDO, posts);
  }

  @Post(':id/repost')
  @UseGuards(JWTAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: 10,
  })
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.OK,
    description: 'Сделать репост',
  })
  async repost(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const repostedPost = await this.generalService.repost(id, request.user['id']);

    return fillObject(PostRDO, repostedPost);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удалить пост по ID'
  })
  async deletePost(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    await this.generalService.delete(id, request.user['id']);
  }

  @Post(':id/like/:state')
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: 10,
  })
  @ApiParam({
    name: 'state',
    description: 'Состояние лайка',
    example: true
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Установить лайк',
  })
  async setLike(@Param('id', ParseIntPipe) id: number, @Param('state', ParseBoolPipe) state: boolean, @Req() request: Request) {
    const likedPost = await this.generalService.setLike(id, request.user['id'], state);

    return fillObject(PostRDO, likedPost);
  }
}
