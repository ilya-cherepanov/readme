import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDTO } from './login-user.dto';


export class CreateUserDTO extends LoginUserDTO {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Джон Коннор'
  })
  public name: string;
}
