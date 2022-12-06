import { ApiProperty } from "@nestjs/swagger";


export class CreateQuotePostDTO {
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
    description: 'Текст цитаты',
    example: 'With software there are only two possibilities: either the users control the programme or the programme controls the users. If the programme controls the users, and the developer controls the programme, then the programme is an instrument of unjust power.',
  })
  text: string;

  @ApiProperty({
    description: 'Автор цитаты',
    example: 'Richard Stallman',
  })
  quoteAuthor: string;
}
