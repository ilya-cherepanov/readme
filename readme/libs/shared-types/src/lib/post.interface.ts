import { PostCategory } from "./post-category.enum";
import { PostStatus } from "./post-status.enum";


export interface BasePost {
  id?: number;
  creatorId: string;
  authorId: string;
  postCategory: PostCategory;
  createdAt: Date;
  publishedAt?: Date;
  postStatus: PostStatus;
  isRePost: boolean;
  originalPostId?: number;
  tags?: string[];
  _count?: {
    likes: number;
  };
}

export interface VideoPost extends BasePost {
  title: string;
  video: string;
}

export interface TextPost extends BasePost {
  title: string;
  text: string;
  previewText: string;
}

export interface QuotePost extends BasePost {
  text: string;
  quoteAuthor: string;
}

export interface PhotoPost extends BasePost {
  photo: string;
}

export interface LinkPost extends BasePost {
  link: string;
  description?: string;
}

export type Post = VideoPost | TextPost | QuotePost | PhotoPost | LinkPost;
