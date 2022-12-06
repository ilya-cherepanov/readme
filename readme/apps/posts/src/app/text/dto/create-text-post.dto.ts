import { ApiProperty } from "@nestjs/swagger";


export class CreateTextPostDTO {
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
    description: 'Название текстового поста',
    example: 'Как попасть в IT',
  })
  title: string;

  @ApiProperty({
    description: 'Текст для статьи',
    example: 'Статья...',
  })
  text: string;

  @ApiProperty({
    description: 'Превью текста',
    example: 'Статья...',
  })
  previewText: string;
}
