import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Password } from '../../user.constants';


export class ChangePasswordDTO {
  @ApiProperty({
    description: 'Пароль пользователя',
    example: '1234pass'
  })
  @Length(Password.MinLength, Password.MaxLength)
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'Новый пароль пользователя',
    example: '1234pass'
  })
  @Length(Password.MinLength, Password.MaxLength)
  @IsString()
  public newPassword: string;
}
