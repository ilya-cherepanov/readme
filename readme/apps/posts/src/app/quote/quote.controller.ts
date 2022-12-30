import { Body, Controller, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { PostRDO } from '../general/rdo/post.rdo';
import { CreateQuotePostDTO } from './dto/create-quote-post.dto';
import { UpdateQuotePostDTO } from './dto/update-quote-post.dto';
import { QuoteService } from './quote.service';


@ApiTags('Posts')
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создана публикация-цитата',
  })
  async create(@Body() dto: CreateQuotePostDTO) {
    const newQuotePost = await this.quoteService.create(dto);

    return fillObject(PostRDO, newQuotePost);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'ID поста',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Изменена публикация-цитата',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Публикация не найдена!'
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateQuotePostDTO) {
    const updatedQuotePost = await this.quoteService.update(id, dto);

    return fillObject(PostRDO, updatedQuotePost);
  }
}
