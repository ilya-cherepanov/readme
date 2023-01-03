import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsMongoId, IsOptional, IsString, Length } from "class-validator";
import { Tag, TextPostContent, TextPostPreviewText, TextPostTitle } from "../../posts.constants";


export class CreateTextPostDTO {
  @ApiProperty({
    description: 'ID пользователя создающего публикацию',
    example: '63945562fd749e7b515950de',
  })
  @IsMongoId()
  creatorId: string;

  @ApiProperty({
    description: 'Тэги',
    example: ['IT', 'frontend', 'backend'],
    required: false,
  })
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
