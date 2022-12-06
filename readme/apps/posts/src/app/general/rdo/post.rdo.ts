import { ApiProperty } from "@nestjs/swagger";
import { PostCategory, PostStatus } from "@readme/shared-types";
import { Expose } from "class-transformer";


export class PostRDO {
  @ApiProperty({
    description: 'Уникальный ID поста',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @Expose({name: '_id'})
  id: string;

  @ApiProperty({
    description: 'ID пользователя создавшего пост',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @Expose()
  creatorId: string;

  @ApiProperty({
    description: 'ID владельца или репостера поста',
    example: '3ee6104d-1c23-4be6-827a-f0bd350b423c',
  })
  @Expose()
  authorId: string;

  @ApiProperty({
    description: 'Тип поста',
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
    example: 'published'
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
  title?: string;

  @ApiProperty({
    description: 'URL для загрузки видео',
    example: 'http://site.com/video/3ee6104d-1c23-4be6-827a-f0bd350b423c',
    required: false,
  })
  @Expose()
  video?: string;

  @ApiProperty({
    description: 'Текст для статьи или цитаты',
    example: 'Статья...',
    required: false,
  })
  @Expose()
  text?: string;

  @ApiProperty({
    description: 'Превью текста',
    example: 'Статья...',
    required: false,
  })
  @Expose()
  previewText?: string;

  @ApiProperty({
    description: 'Автор цитаты',
    example: 'Richard Stallman',
    required: false,
  })
  @Expose()
  quoteAuthor?: string;

  @ApiProperty({
    description: 'URL для загрузки фотографии',
    example: 'http://site.com/video/3ee6104d-1c23-4be6-827a-f0bd350b423c',
    required: false,
  })
  @Expose()
  photo?: string;

  @ApiProperty({
    description: 'Ссылка для публикации-ссылки',
    example: 'http://site.com/content/some-content',
    required: false,
  })
  @Expose()
  link?: string;

  @ApiProperty({
    description: 'Описание для публикации-ссылки',
    example: 'Информация о скидках',
    required: false,
  })
  @Expose()
  description?: string;
}
