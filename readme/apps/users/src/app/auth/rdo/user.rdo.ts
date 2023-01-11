import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";


export class UserRDO {
  @ApiProperty({
    description: 'Уникальный пользовательский ID',
    example: '63b1b72b07247fd1feca2cbc'
  })
  @Expose({name: '_id'})
  @Transform((value) => value.obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Джон Коннор'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Количество постов',
    example: 12,
    required: false,
  })
  @Expose()
  public posts: number;

  @ApiProperty({
    description: 'Количество подписчиков',
    example: 102
  })
  @Expose()
  public subscribers: number;

  @ApiProperty({
    description: 'Время регистрации',
    example: '2022-03-01T06:57:43.249Z'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Аватар',
    example: 'http://hostname/files/avatar.jpg'
  })
  @Expose()
  public avatar!: string;
}
