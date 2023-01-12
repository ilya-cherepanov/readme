import { Body, Controller, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { JWTAuthGuard } from '../general/guards/jwt-auth.guard';
import { PostRDO } from '../general/rdo/post.rdo';
import { CreateQuotePostDTO } from './dto/create-quote-post.dto';
import { UpdateQuotePostDTO } from './dto/update-quote-post.dto';
import { QuoteService } from './quote.service';
import { Request } from 'express';


@ApiTags('Posts')
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    type: PostRDO,
    status: HttpStatus.CREATED,
    description: 'Создана публикация-цитата',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован!'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Введены не валидные данные!'
  })
  async create(@Body() dto: CreateQuotePostDTO, @Req() request: Request) {
    const newQuotePost = await this.quoteService.create(request.user['id'], dto, request.user['name']);

    return fillObject(PostRDO, newQuotePost);
  }

  @Patch(':id')
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
    description: 'Изменена публикация-цитата',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован или не является создателем поста!',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Введены не валидные данные!'
  })
  async update(@Param('id', ParseIntPipe) id: number, @Req() request: Request, @Body() dto: UpdateQuotePostDTO) {
    const updatedQuotePost = await this.quoteService.update(id, request.user['id'], dto);

    return fillObject(PostRDO, updatedQuotePost);
  }
}
