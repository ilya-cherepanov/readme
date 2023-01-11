export interface Comment {
  id?: number;
  text: string;
  authorId: string;
  postId: number;
  createdAt: Date;
}
