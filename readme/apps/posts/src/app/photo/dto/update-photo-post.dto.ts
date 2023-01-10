import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { ArrayMaxSize, IsArray, IsOptional, IsString, Length } from "class-validator";
import { Tag } from "../../posts.constants";


export class UpdatePhotoPostDTO {
  @ApiProperty({
    description: 'Тэги',
    example: ['IT', 'frontend', 'backend'],
    required: false,
  })
  @Transform(({value}) => value.map((tag: string) => tag.toLowerCase()))
  @Length(Tag.MinLength, Tag.MaxLength, {each: true})
  @IsString({each: true})
  @ArrayMaxSize(Tag.MaxCount)
  @IsArray()
  @IsOptional()
  tags?: string[];
}
