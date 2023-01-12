import { ApiProperty } from "@nestjs/swagger";
import { transformTagArray } from "../../../../utils/helpers";
import { Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsOptional, IsString, Length, Matches } from "class-validator";
import { Tag, TAG_FORMAT, TextPostContent, TextPostPreviewText, TextPostTitle } from "../../posts.constants";


export class CreateTextPostDTO {
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
    description: 'Название текстового поста',
    example: 'Как попасть в IT',
  })
  @Length(TextPostTitle.MinLength, TextPostTitle.MaxLength)
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Текст для статьи',
    example: 'Статья...',
  })
  @Length(TextPostContent.MinLength, TextPostContent.MaxLength)
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Превью текста',
    example: 'Статья...',
  })
  @Length(TextPostPreviewText.MinLength, TextPostPreviewText.MaxLength)
  @IsString()
  previewText: string;
}
