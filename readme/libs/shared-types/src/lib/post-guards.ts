import { PostCategory } from './post-category.enum';
import { LinkPost, PhotoPost, Post, QuotePost, TextPost, VideoPost } from './post.interface';


export function isVideoPost(post: Post): post is VideoPost {
  return post.postCategory === PostCategory.Video;
}

export function isTextPost(post: Post): post is TextPost {
  return post.postCategory === PostCategory.Text;
}

export function isQuotePost(post: Post): post is QuotePost {
  return post.postCategory === PostCategory.Quote;
}

export function isPhotoPost(post: Post): post is PhotoPost {
  return post.postCategory === PostCategory.Photo;
}

export function isLinkPost(post: Post): post is LinkPost {
  return post.postCategory === PostCategory.Link;
}
