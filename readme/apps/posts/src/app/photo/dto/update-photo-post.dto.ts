import { ApiProperty } from "@nestjs/swagger";
import { transformTagArray } from "apps/posts/utils/helpers";
import { Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsOptional, IsString, Length, Matches } from "class-validator";
import { Tag, TAG_FORMAT } from "../../posts.constants";


export class UpdatePhotoPostDTO {
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
}
