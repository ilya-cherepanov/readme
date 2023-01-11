import { ApiProperty } from "@nestjs/swagger";
import { PostCategory, PostStatus } from "@readme/shared-types";
import { Expose, Transform } from "class-transformer";


export class PostRDO {
  @ApiProperty({
    description: 'Уникальный ID поста',
    example: 10,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'ID пользователя создавшего пост',
    example: '63945562fd749e7b515950de',
  })
  @Expose()
  creatorId: string;

  @ApiProperty({
    description: 'ID владельца или репостера поста',
    example: '63945562fd749e7b515950de',
  })
  @Expose()
  authorId: string;

  @ApiProperty({
    description: 'Тип поста',
    enum: PostCategory,
    example: 'text',
  })
  @Expose()
  postCategory: PostCategory;

  @ApiProperty({
    description: 'Дата создания поста',
    example: '2022-03-01T06:57:43.249Z',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'Дата публикации поста',
    example: '2022-03-01T06:57:43.249Z',
    required: false,
  })
  @Expose()
  publishedAt?: string;

  @ApiProperty({
    description: 'Статус публикации поста',
    enum: PostStatus,
    example: 'published',
  })
  @Expose()
  postStatus: PostStatus;

  @ApiProperty({
    description: 'Является ли пост репостом',
    example: false,
  })
  @Expose()
  isRePost: boolean;

  @ApiProperty({
    description: 'ID оригинального поста, если данный пост является репостом',
    example: false,
    required: false,
  })
  @Expose()
  @Transform(({value}) => value ?? undefined)
  originalPostId?: string;

  @ApiProperty({
    description: 'Тэги',
    example: ['IT', 'frontend', 'backend'],
    required: false,
  })
  @Expose()
  tags?: string[];

  @ApiProperty({
    description: 'Название текстового или видео поста',
    example: 'Как попасть в IT',
    required: false,
  })
  @Expose()
  @Transform(({value}) => value ?? undefined)
  title?: string;

  @ApiProperty({
    description: 'URL для загрузки видео',
    example: 'http://site.com/video/3ee6104d-1c23-4be6-827a-f0bd350b423c',
    required: false,
  })
  @Expose()
  @Transform(({value}) => value ?? undefined)
  video?: string;

  @ApiProperty({
    description: 'Текст для статьи или цитаты',
    example: 'Статья...',
    required: false,
  })
  @Expose()
  @Transform(({value}) => value ?? undefined)
  text?: string;

  @ApiProperty({
    description: 'Превью текста',
    example: 'Статья...',
    required: false,
  })
  @Expose()
  @Transform(({value}) => value ?? undefined)
  previewText?: string;

  @ApiProperty({
    description: 'Автор цитаты',
    example: 'Richard Stallman',
    required: false,
  })
  @Expose()
  @Transform(({value}) => value ?? undefined)
  quoteAuthor?: string;

  @ApiProperty({
    description: 'URL для загрузки фотографии',
    example: 'http://site.com/video/3ee6104d-1c23-4be6-827a-f0bd350b423c',
    required: false,
  })
  @Expose()
  @Transform(({value}) => value ?? undefined)
  photo?: string;

  @ApiProperty({
    description: 'Ссылка для публикации-ссылки',
    example: 'http://site.com/content/some-content',
    required: false,
  })
  @Expose()
  @Transform(({value}) => value ?? undefined)
  link?: string;

  @ApiProperty({
    description: 'Описание для публикации-ссылки',
    example: 'Информация о скидках',
    required: false,
  })
  @Expose()
  @Transform(({value}) => value ?? undefined)
  description?: string;

  @ApiProperty({
    description: 'Количество лайков',
    example: 10,
    required: true,
  })
  @Expose()
  @Transform((value) => value.obj._count.likes)
  likes: number

  @ApiProperty({
    description: 'Количество комментариев',
    example: 3,
    required: true,
  })
  @Expose()
  @Transform((value) => value.obj._count.comments)
  comments: number
}
