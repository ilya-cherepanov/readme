import { ApiProperty } from "@nestjs/swagger";


export class CreatePhotoPostDTO {
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
    description: 'URL для загрузки фотографии',
    example: 'http://site.com/video/3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  photo: string;
}
