import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class UserRDO {
  @ApiProperty({
    description: 'Уникальный пользовательский ID',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Джон Коннор'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Количество постов',
    example: 12
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
