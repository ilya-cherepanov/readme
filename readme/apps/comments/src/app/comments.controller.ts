import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentRDO } from './rdo/comment.rdo';


@ApiTags('Comments')
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/posts/:postId')
  @ApiResponse({
    type: Array<CommentRDO>,
    status: HttpStatus.OK,
    description: 'Получить комментарии для поста с соответствующим ID',
  })
  async get(@Param('postId', ParseIntPipe) postId: number, @Query('page') page = 0) {
    const comments = await this.commentsService.get(postId, page);

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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удалить комментарий по ID'
  })
  async delete(@Param('id') id: string) {
    await this.commentsService.delete(id);
  }
}
