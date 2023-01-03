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
