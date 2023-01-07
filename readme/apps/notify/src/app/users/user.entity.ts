import { User } from '../../types/user.interface';


export class UserEntity implements User {
  _id?: string;
  email: string;
  userId: string;

  constructor(user: User) {
     this.fillEntity(user);
  }

  public toObject(): User {
    return {...this};
  }

  public fillEntity(user: User): void {
    this._id = user._id;
    this.email = user.email;
    this.userId = user.userId
  }
}
