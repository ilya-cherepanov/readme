import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class CommentRDO {
  @ApiProperty({
    description: 'Идентификатор комментария',
    example: '63b1b72b07247fd1feca2cbc'
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Текст комментария',
    example: 'Hello, world!'
  })
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Идентификатор автора',
    example: '63b1b72b07247fd1feca2cbc'
  })
  @Expose()
  authorId: string;

  @ApiProperty({
    description: 'Идентификатор поста',
    example: 10
  })
  @Expose()
  postId: number;

  @ApiProperty({
    description: 'Дата создания',
    example: '2022-03-01T06:57:43.249Z'
  })
  @Expose()
  createdAt: string;
}
