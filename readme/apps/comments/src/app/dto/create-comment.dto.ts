import { ApiProperty } from "@nestjs/swagger";


export class CreateCommentDTO {
  @ApiProperty({
    description: 'Текст комментария',
    example: 'Hello, world!'
  })
  public text: string;

  @ApiProperty({
    description: 'Идентификатор автора',
    example: 'e203b269-4b66-4e3f-acd3-7ce25e9828f5'
  })
  public authorId: string;

  @ApiProperty({
    description: 'Идентификатор поста',
    example: 'e203b269-4b66-4e3f-acd3-7ce25e9828f5'
  })
  public postId: string;
}
