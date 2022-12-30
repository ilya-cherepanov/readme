import { ApiProperty } from '@nestjs/swagger';


export class LikePostDTO {
  @ApiProperty({
    description: 'ID поста',
    example: 10,
  })
  postId: number;

  @ApiProperty({
    description: 'ID пользователя',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b4210',
  })
  userId: string;
}
