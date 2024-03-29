import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Min } from 'class-validator';
import { Text } from '../comments.constants';


export class CreateCommentDTO {
  @ApiProperty({
    description: 'Текст комментария',
    example: 'Hello, world!'
  })
  @Length(Text.MinLength, Text.MaxLength)
  @IsString()
  public text: string;

  @ApiProperty({
    description: 'Идентификатор поста',
    example: 10
  })
  @Min(0)
  @IsInt()
  public postId: number;
}
