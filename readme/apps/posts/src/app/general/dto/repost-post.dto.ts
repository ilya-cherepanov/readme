import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsMongoId } from "class-validator";


export class RepostPostDTO {
  @ApiProperty({
    description: 'ID поста',
    example: 10,
  })
  @IsInt()
  postId: number;

  @ApiProperty({
    description: 'ID репостера поста',
    example: '63945562fd749e7b515950de',
  })
  @IsMongoId()
  userId: string;
}
