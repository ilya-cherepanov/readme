import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { GetCommentsQuery } from './query/get-comments.query';
import { CommentRDO } from './rdo/comment.rdo';
import { MongoIdValidationPipe } from '@readme/core';


@ApiTags('Comments')
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/posts/:postId')
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
  @ApiResponse({
    type: CommentRDO,
    status: HttpStatus.CREATED,
    description: 'Создать комментарии для поста с соответствующим ID',
  })
  async create(@Body() dto: CreateCommentDTO) {
    const newComment = await this.commentsService.create(dto);

    return fillObject(CommentRDO, newComment);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'ID комментария',
    example: '63b1b72b07247fd1feca2cbc',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удалить комментарий по ID'
  })
  async delete(@Param('id', MongoIdValidationPipe) id: string) {
    await this.commentsService.delete(id);
  }
}
