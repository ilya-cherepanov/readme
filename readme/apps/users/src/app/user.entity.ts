import { genSalt, hash, compare } from 'bcrypt';
import { User } from '@readme/shared-types';
import { SALT_ROUNDS } from './user.constants';


export class UserEntity implements User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;

  constructor(user: User) {
     this.fillEntity(user);
  }

  public toObject(): User {
    return {...this};
  }

  public async setPassword(password: string): Promise<this> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async checkPassword(password: string): Promise<boolean> {
    return compare(this.password, password);
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;

    if (user.avatar) {
      this.avatar = user.avatar;
    }
  }
}
