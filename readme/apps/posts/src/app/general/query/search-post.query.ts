import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class SearchPostQuery {
  @ApiProperty({
    description: 'Название поста',
    example: 'как пропатчить kde2 под freebsd',
    required: true,
  })
  @IsString()
  title: string;
}
