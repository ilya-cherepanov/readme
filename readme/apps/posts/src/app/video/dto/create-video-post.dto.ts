import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsMongoId, IsOptional, IsString, IsUrl, Length } from "class-validator";
import { Tag, VideoPostTitle } from "../../posts.constants";


export class CreateVideoPostDTO {
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
    description: 'Название видео поста',
    example: 'Как попасть в IT',
  })
  @Length(VideoPostTitle.MinLength, VideoPostTitle.MaxLength)
  @IsString()
  title: string;

  @ApiProperty({
    description: 'URL для прикрепления видео с YouTube',
    example: 'https://www.youtube.com/watch?v=uAKzFhE3rxU',
  })
  @IsUrl({host_whitelist: [/youtube.com/]})
  video: string;
}
