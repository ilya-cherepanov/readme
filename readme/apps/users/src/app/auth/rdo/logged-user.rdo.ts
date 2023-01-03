import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";


export class LoggedUserRDO {
  @ApiProperty({
    description: 'Уникальный пользовательский ID',
    example: '63b1b72b07247fd1feca2cbc',
  })
  @Expose({name: '_id'})
  @Transform((value) => value.obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@mail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'JWT токен',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @Expose()
  public access_token: string;
}
