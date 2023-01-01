import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";
import { COMMENTS_PER_PAGE } from "../comments.constants";

export class GetCommentsQuery {
  @Transform(({value}) => parseInt(value) || COMMENTS_PER_PAGE)
  @Min(1)
  @IsInt()
  @IsOptional()
  quantity?: number = COMMENTS_PER_PAGE;

  @Transform(({value}) => parseInt(value) || 0)
  @Min(0)
  @IsInt()
  @IsOptional()
  page?: number = 0;
}
