import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDTO } from './login-user.dto';
import { IsString, Length } from 'class-validator';


export class CreateUserDTO extends LoginUserDTO {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Джон Коннор'
  })
  @Length(3, 50)
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '1234pass'
  })
  @Length(6, 12)
  @IsString()
  public repeatedPassword: string;
}
