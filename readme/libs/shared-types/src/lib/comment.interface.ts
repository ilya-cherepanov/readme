export interface Comment {
  _id?: string;
  text: string;
  authorId: string;
  postId: string;
  createdAt: Date;
}
