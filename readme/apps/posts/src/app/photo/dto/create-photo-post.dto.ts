import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsMongoId, IsOptional, IsString, IsUrl, Length } from "class-validator";
import { Tag } from "../../posts.constants";


export class CreatePhotoPostDTO {
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
    description: 'URL для загрузки фотографии',
    example: 'http://site.com/video/3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @IsUrl({require_host: false})
  photo: string;
}
