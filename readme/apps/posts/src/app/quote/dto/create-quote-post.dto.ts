import { ApiProperty } from "@nestjs/swagger";
import { transformTagArray } from "../../../../utils/helpers";
import { Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsOptional, IsString, Length, Matches } from "class-validator";
import { QuotePostAuthor, QuotePostText, Tag, TAG_FORMAT } from "../../posts.constants";


export class CreateQuotePostDTO {
  @ApiProperty({
    description: 'Тэги',
    example: ['IT', 'frontend', 'backend'],
    required: false,
  })
  @Transform(({value}) => transformTagArray(value))
  @Matches(TAG_FORMAT, {each: true})
  @Length(Tag.MinLength, Tag.MaxLength, {each: true})
  @IsString({each: true})
  @ArrayMaxSize(Tag.MaxCount)
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Текст цитаты',
    example: 'With software there are only two possibilities: either the users control the programme or the programme controls the users. If the programme controls the users, and the developer controls the programme, then the programme is an instrument of unjust power.',
  })
  @Length(QuotePostText.MinLength, QuotePostText.MaxLength)
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Автор цитаты',
    example: 'Richard Stallman',
  })
  @Length(QuotePostAuthor.MinLength, QuotePostAuthor.MaxLength)
  @IsString()
  quoteAuthor: string;
}
