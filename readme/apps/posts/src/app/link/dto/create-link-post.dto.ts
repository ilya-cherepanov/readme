import { ApiProperty } from "@nestjs/swagger";


export class CreateLinkPostDTO {
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
    description: 'Ссылка для публикации-ссылки',
    example: 'http://site.com/content/some-content',
  })
  link: string;

  @ApiProperty({
    description: 'Описание для публикации-ссылки',
    example: 'Информация о скидках',
    required: false,
  })
  description?: string;
}
