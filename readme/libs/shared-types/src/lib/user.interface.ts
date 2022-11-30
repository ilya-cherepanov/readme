export interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  posts: number;
  subscribers: number;
  createdAt: Date;
  avatar?: string;
}
