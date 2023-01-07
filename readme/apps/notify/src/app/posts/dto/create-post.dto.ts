import { IsInt, IsString, Min } from "class-validator";


export class CreatePostDTO {
  @IsString()
  public title: string;

  @Min(0)
  @IsInt()
  public postId: number;
}
