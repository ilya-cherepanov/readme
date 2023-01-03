import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDTO } from './login-user.dto';
import { IsString, Length } from 'class-validator';
import { Name, Password } from '../../user.constants';


export class CreateUserDTO extends LoginUserDTO {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Джон Коннор'
  })
  @Length(Name.MinLength, Name.MaxLength)
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '1234pass'
  })
  @Length(Password.MinLength, Password.MaxLength)
  @IsString()
  public repeatedPassword: string;
}
