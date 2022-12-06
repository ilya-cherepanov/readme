import { BasePost, LinkPost, PhotoPost, Post, PostCategory, PostStatus, QuotePost, TextPost, VideoPost } from '@readme/shared-types';


abstract class BasePostEntity implements BasePost {
  _id?: string;
  creatorId: string;
  authorId: string;
  postCategory: PostCategory;
  createdAt: Date;
  publishedAt?: Date;
  postStatus: PostStatus;
  isRePost: boolean;
  originalPostId?: string;
  tags?: string[];

  constructor(post: BasePost) {
     this.fillEntity(post);
  }

  public abstract toObject(): Post;

  public fillEntity(post: BasePost): void {
    this._id = post._id;
    this.creatorId = post.creatorId;
    this.authorId = post.authorId;
    this.createdAt = post.createdAt;
    this.postStatus = post.postStatus;
    this.isRePost = post.isRePost;

    if (post.publishedAt) {
      this.publishedAt = post.publishedAt;
    }
    if (post.originalPostId) {
      this.originalPostId = post.originalPostId;
    }
    if (post.tags) {
      this.tags = post.tags;
    }
  }
}


export class VideoPostEntity extends BasePostEntity implements VideoPost {
  postCategory = PostCategory.Video;
  title: string;
  video: string;

  constructor(post: VideoPost) {
    super(post);
  }

  public toObject(): VideoPost {
    return {...this};
  }

  public fillEntity(post: VideoPost): void {
    super.fillEntity(post);

    this.title = post.title;
    this.video = post.video;
  }
}


export class TextPostEntity extends BasePostEntity implements TextPost {
  postCategory = PostCategory.Text;
  title: string;
  text: string;
  previewText: string;

  constructor(post: TextPost) {
    super(post);
  }

  public toObject(): TextPost {
    return {...this};
  }

  public fillEntity(post: TextPost): void {
    super.fillEntity(post);

    this.title = post.title;
    this.text = post.text;
    this.previewText = post.previewText;
  }
}


export class LinkPostEntity extends BasePostEntity implements LinkPost {
  postCategory = PostCategory.Link;
  link: string;
  description?: string;

  constructor(post: LinkPost) {
    super(post);
  }

  public toObject(): LinkPost {
    return {...this};
  }

  public fillEntity(post: LinkPost): void {
    super.fillEntity(post);

    this.link = post.link;
    if (post.description) {
      this.description = post.description;
    }
  }
}


export class PhotoPostEntity extends BasePostEntity implements PhotoPost {
  postCategory = PostCategory.Photo;
  photo: string;

  constructor(post: PhotoPost) {
    super(post);
  }

  public toObject(): PhotoPost {
    return {...this};
  }

  public fillEntity(post: PhotoPost): void {
    super.fillEntity(post);

    this.photo = post.photo;
  }
}


export class QuotePostEntity extends BasePostEntity implements QuotePost {
  postCategory = PostCategory.Quote;
  text: string;
  quoteAuthor: string;

  constructor(post: QuotePost) {
    super(post);
  }

  public toObject(): QuotePost {
    return {...this};
  }

  public fillEntity(post: QuotePost): void {
    super.fillEntity(post);

    this.text = post.text;
    this.quoteAuthor = post.quoteAuthor;
  }
}

export type PostEntity = VideoPostEntity | PhotoPostEntity | TextPostEntity | LinkPostEntity | QuotePostEntity;
