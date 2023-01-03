import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsMongoId, IsOptional, IsString, IsUrl, Length, MaxLength } from 'class-validator';
import { LinkPostDescription, Tag } from "../../posts.constants";


export class CreateLinkPostDTO {
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
    description: 'Ссылка для публикации-ссылки',
    example: 'http://site.com/content/some-content',
  })
  @IsUrl()
  link: string;

  @ApiProperty({
    description: 'Описание для публикации-ссылки',
    example: 'Информация о скидках',
    required: false,
  })
  @MaxLength(LinkPostDescription.MaxLength)
  @IsString()
  @IsOptional()
  description?: string;
}
