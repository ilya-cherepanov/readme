export const enum Tag {
  MinLength = 3,
  MaxLength = 10,
  MaxCount = 8,
}

export const enum VideoPostTitle {
  MinLength = 20,
  MaxLength = 50,
}

export const enum TextPostTitle {
  MinLength = 20,
  MaxLength = 50,
}

export const enum TextPostPreviewText {
  MinLength = 50,
  MaxLength = 255,
}

export const enum TextPostContent {
  MinLength = 100,
  MaxLength = 1024,
}

export const enum QuotePostText {
  MinLength = 20,
  MaxLength = 300,
}

export const enum QuotePostAuthor {
  MinLength = 3,
  MaxLength = 50,
}

export const enum LinkPostDescription {
  MaxLength = 300,
}

export const DEFAULT_POSTS_PER_PAGE = 25;
export const ENV_FILE_PATH = 'environments/.posts.env';
export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
export const PHOTO_FILE_TYPES = /jpeg|jpg|png/;
export const PHOTO_FILE_SIZE = 1024 * 1024;
export const MAX_SEARCHED_POSTS = 20;
export const TAG_FORMAT = /^\p{L}\S*$/u;
export const VIDEO_HOST_WHITELIST = [/youtube.com/];
export const JWT_ACCESS_EXPIRES_IN = '300s';

export const POST_DOES_NOT_EXIST = 'Post with given ID does not exist!';
export const USER_IS_POST_CREATOR = 'User with given ID is creator of the post!';
export const USER_IS_NOT_POST_CREATOR = 'User with given ID is not creator of the post!';
export const POST_ALREADY_REPOSTED = 'The post has been already reposted!';
export const USER_IS_NOT_AUTHOR = 'User is not an author of the post!';
export const UNKNOWN_POST_TYPE = 'Unable to determine the type of post!';
export const NOT_LINK_POST = 'Post with given ID is not link post!';
export const NOT_VIDEO_POST = 'Post with given ID is not video post!';
export const NOT_TEXT_POST = 'Post with given ID is not text post!';
export const NOT_PHOTO_POST = 'Post with given ID is not photo post!';
export const NOT_QUOTE_POST = 'Post with given ID is not quote post!';
export const TAGS_NOT_VALID = 'Each tag must start with a letter and not contain spaces!';
export const POST_NOT_PUBLISHED = 'The post has not been published!';
