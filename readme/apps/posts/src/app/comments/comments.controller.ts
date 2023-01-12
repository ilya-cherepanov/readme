import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { GetCommentsQuery } from './query/get-comments.query';
import { CommentRDO } from './rdo/comment.rdo';
import { JWTAuthGuard } from '../general/guards/jwt-auth.guard';
import { Request } from 'express';


@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/post/:postId')
  @ApiResponse({
    type: [CommentRDO],
    status: HttpStatus.OK,
    description: 'Получить комментарии для поста с соответствующим ID',
  })
  @ApiParam({
    name: 'postId',
    description: 'ID поста',
    example: 10,
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Поста с данным ID не существует',
  })
  async get(@Param('postId', ParseIntPipe) postId: number, @Query() query: GetCommentsQuery) {
    const comments = await this.commentsService.get(postId, query);

    return fillObject(CommentRDO, comments);
  }

  @Post('')
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: CommentRDO,
    status: HttpStatus.CREATED,
    description: 'Создать комментарии для поста с соответствующим ID',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  async create(@Req() request: Request, @Body() dto: CreateCommentDTO) {
    const newComment = await this.commentsService.create(request.user['id'], dto);

    return fillObject(CommentRDO, newComment);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'ID комментария',
    example: 10,
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удалить комментарий по ID'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Комментарий с данным ID не найден'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Не валидный запрос!'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован или не является автором комментария'
  })
  async delete(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    await this.commentsService.delete(id, request.user['id']);
  }
}
