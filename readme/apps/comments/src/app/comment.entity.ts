import { Comment } from '@readme/shared-types'


export class CommentEntity implements Comment {
  _id?: string;
  text: string;
  authorId: string;
  postId: string;
  createdAt: Date;

  constructor(comment: Comment) {
     this.fillEntity(comment);
  }

  public toObject(): Comment {
    return {...this};
  }

  public fillEntity(comment: Comment): void {
    this._id = comment._id;
    this.text = comment.text;
    this.authorId = comment.authorId;
    this.postId = comment.postId;
    this.createdAt = comment.createdAt;
  }
}
