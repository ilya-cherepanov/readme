import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class UserAvatarRDO {
  @ApiProperty({
    description: 'Название файла с аватаром',
    example: '0bc28bf7-c2cd-4f81-bf98-cf3983d76338.jpg',
  })
  @Expose()
  public avatar: string;
}
