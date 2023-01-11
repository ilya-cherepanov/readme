import { Comment } from '@readme/shared-types'


export class CommentEntity implements Comment {
  id?: number;
  text: string;
  authorId: string;
  postId: number;
  createdAt: Date;

  constructor(comment: Comment) {
     this.fillEntity(comment);
  }

  public toObject(): Comment {
    return {...this};
  }

  public fillEntity(comment: Comment): void {
    this.id = comment.id;
    this.text = comment.text;
    this.authorId = comment.authorId;
    this.postId = comment.postId;
    this.createdAt = comment.createdAt;
  }
}
