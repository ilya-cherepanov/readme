import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class LoginUserDTO {
  @ApiProperty({
    description: 'Уникальный адрес электронной почты',
    example: 'user@mail.com'
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '1234pass'
  })
  @Length(6, 12)
  @IsString()
  public password: string;
}
