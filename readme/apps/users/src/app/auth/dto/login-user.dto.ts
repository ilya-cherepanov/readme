import { ApiProperty } from "@nestjs/swagger";


export class LoginUserDTO {
  @ApiProperty({
    description: 'Уникальный адрес электронной почты',
    example: 'user@mail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '1234pass'
  })
  public password: string;
}
