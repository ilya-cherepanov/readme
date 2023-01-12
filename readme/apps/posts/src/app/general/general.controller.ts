import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, MongoIdValidationPipe } from '@readme/core';
import { Request } from 'express';
import { GeneralService } from './general.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { GetPostsQuery } from './query/get-posts.query';
import { SearchPostQuery } from './query/search-post.query';
import { PostCountRDO } from './rdo/post-count-rdo';
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  async getPosts(@Query() query: GetPostsQuery) {
    const posts = await this.generalService.get(query);

    return fillObject(PostRDO, posts);
  }

  @Get('post/:id')
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  async getPost(@Param('id', ParseIntPipe) id: number) {
    const post = await this.generalService.getOne(id);

    return fillObject(PostRDO, post);
  }

  @Get('search')
  @ApiResponse({
    type: [PostRDO],
    status: HttpStatus.OK,
    description: 'Ищет опубликованный посты по названию'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  async search(@Query() query: SearchPostQuery) {
    const posts = await this.generalService.search(query);

    return fillObject(PostRDO, posts);
  }

  @Get('draft')
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: [PostRDO],
    status: HttpStatus.OK,
    description: 'Получает посты-черновики'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован!'
  })
  async getDraft(@Req() request: Request) {
    const posts = await this.generalService.getDraft(request.user['id']);

    return fillObject(PostRDO, posts);
  }

  @Get('count/:userId')
  @ApiResponse({
    type: PostCountRDO,
    status: HttpStatus.OK,
    description: 'Возвращает количество публикаций пользователя с конкретным ID',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  async getPostCountByUserId(@Param('userId', MongoIdValidationPipe) userId: string) {
    return fillObject(PostCountRDO, await this.generalService.getPostCountByUserId(userId));
  }

  @Post(':id/repost')
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
    description: 'Создает репост репост',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован!'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  async repost(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const repostedPost = await this.generalService.repost(id, request.user['id']);

    return fillObject(PostRDO, repostedPost);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удалить пост по ID'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован или не является создателем поста!'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  async deletePost(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    await this.generalService.delete(id, request.user['id']);
  }

  @Post(':id/like/:state')
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
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
    type: PostRDO,
    status: HttpStatus.OK,
    description: 'Установить лайк',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован!'
  })
  async setLike(@Param('id', ParseIntPipe) id: number, @Param('state', ParseBoolPipe) state: boolean, @Req() request: Request) {
    const likedPost = await this.generalService.setLike(id, request.user['id'], state);

    return fillObject(PostRDO, likedPost);
  }

  @Post(':id/publish/:state')
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.OK,
    description: 'Установить состояние публикации',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован!'
  })
  async publish(@Param('id', ParseIntPipe) id: number, @Param('state', ParseBoolPipe) state: boolean, @Req() request: Request) {
    const post = await this.generalService.publishPost(id, request.user['id'], state)

    return fillObject(PostRDO, post);
  }
}
