import { ApiProperty } from "@nestjs/swagger";
import { PostCategory } from "@readme/shared-types";
import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Min } from "class-validator";
import { DEFAULT_POSTS_PER_PAGE } from "../../posts.constants";
import { SortOrder } from "../../../../types/sort-order.enum";


export class GetPostsQuery {
  @ApiProperty({
    description: 'Количество загружаемых постов',
    default: DEFAULT_POSTS_PER_PAGE,
    example: 10,
    required: false,
  })
  @Transform(({value}) => parseInt(value) || DEFAULT_POSTS_PER_PAGE)
  @Min(1)
  @IsInt()
  @IsOptional()
  public quantity?: number = DEFAULT_POSTS_PER_PAGE;

  @ApiProperty({
    description: 'Страница загрузки постов',
    default: 0,
    example: 1,
    required: false,
  })
  @Transform(({value}) => parseInt(value) || 0)
  @Min(0)
  @IsInt()
  @IsOptional()
  public page?: number = 0;

  @ApiProperty({
    description: 'Отсортировать по дате публикации',
    enum: SortOrder,
    default: SortOrder.Descending,
    example: SortOrder.Ascending,
    required: false,
  })
  @IsEnum(SortOrder, {
    message: 'sortByPublish must be "asc" or "desc"',
  })
  @IsOptional()
  public sortByPublish?: SortOrder = SortOrder.Descending;

  @ApiProperty({
    description: 'Отсортировать по количеству лайков',
    enum: SortOrder,
    example: SortOrder.Descending,
    required: false,
  })
  @IsEnum(SortOrder, {
    message: 'sortByLikes must be "asc" or "desc"',
  })
  @IsOptional()
  public sortByLikes?: SortOrder;

  @ApiProperty({
    description: 'Отсортировать по количеству комментариев',
    enum: SortOrder,
    example: SortOrder.Descending,
    required: false,
  })
  @IsEnum(SortOrder, {
    message: 'sortByComments must be "asc" or "desc"',
  })
  @IsOptional()
  public sortByComments?: SortOrder;

  @ApiProperty({
    description: 'Указать категорию публикации(текст, видео, фото, цитата, ссылка)',
    enum: PostCategory,
    example: PostCategory.Text,
    required: false,
  })
  @IsEnum(PostCategory)
  @IsOptional()
  public postCategory?: PostCategory;
}
