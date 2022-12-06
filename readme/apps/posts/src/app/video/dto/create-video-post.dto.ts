import { ApiProperty } from "@nestjs/swagger";


export class CreateVideoPostDTO {
  @ApiProperty({
    description: 'ID пользователя создающего публикацию',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  creatorId: string;

  @ApiProperty({
    description: 'Тэги',
    example: ['IT', 'frontend', 'backend'],
    required: false,
  })
  tags?: string[];

  @ApiProperty({
    description: 'Название видео поста',
    example: 'Как попасть в IT',
  })
  title: string;

  @ApiProperty({
    description: 'URL для загрузки видео',
    example: 'http://site.com/video/3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  video: string;
}
