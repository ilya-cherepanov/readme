import { ApiProperty } from "@nestjs/swagger";
import { transformTagArray } from "../../../../utils/helpers";
import { Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsOptional, IsString, IsUrl, Length, Matches } from "class-validator";
import { Tag, TAG_FORMAT, VideoPostTitle, VIDEO_HOST_WHITELIST } from "../../posts.constants";


export class CreateVideoPostDTO {
  @ApiProperty({
    description: 'Тэги',
    example: ['IT', 'frontend', 'backend'],
    required: false,
  })
  @Transform(({value}) => transformTagArray(value))
  @Matches(TAG_FORMAT, {each: true, message: 'Each tag must start with a letter and not contain spaces'})
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
  @IsUrl({host_whitelist: VIDEO_HOST_WHITELIST})
  video: string;
}
