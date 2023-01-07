import { Post } from '../../types/post.intefrace';


export class PostEntity implements Post {
  _id?: string;
  title: string;
  postId: number;

  constructor(post: Post) {
     this.fillEntity(post);
  }

  public toObject(): Post {
    return {...this};
  }

  public fillEntity(post: Post): void {
    this._id = post._id;
    this.title = post.title;
    this.postId = post.postId;
  }
}
