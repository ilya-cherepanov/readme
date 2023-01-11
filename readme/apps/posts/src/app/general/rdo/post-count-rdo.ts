import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class PostCountRDO {
  @ApiProperty({
    description: 'Количество постов',
    example: 14,
  })
  @Expose()
  public count: number;
}
