import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  async get(@Param('postId', ParseIntPipe) postId: number, @Query() query: GetCommentsQuery) {
    const comments = await this.commentsService.get(postId, query);

    return fillObject(CommentRDO, comments);
  }

  @Post('')
  @UseGuards(JWTAuthGuard)
  @ApiResponse({
    type: CommentRDO,
    status: HttpStatus.CREATED,
    description: 'Создать комментарии для поста с соответствующим ID',
  })
  async create(@Req() request: Request, @Body() dto: CreateCommentDTO) {
    const newComment = await this.commentsService.create(request.user['id'], dto);

    return fillObject(CommentRDO, newComment);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'ID комментария',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удалить комментарий по ID'
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.commentsService.delete(id);
  }
}
