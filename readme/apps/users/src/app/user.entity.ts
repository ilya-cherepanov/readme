import { genSalt, hash, compare } from 'bcrypt';
import { User } from '@readme/shared-types';
import { REFRESH_TOKEN_NOT_DEFINED, SALT_ROUNDS } from './user.constants';
import { ForbiddenException } from '@nestjs/common';


export class UserEntity implements User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  posts?: number;
  subscribers: number;
  createdAt: Date;
  avatar?: string;
  refreshTokenHash?: string;

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
    return compare(password, this.password);
  }

  public async setRefreshToken(refreshToken: string): Promise<this> {
    this.refreshTokenHash = await hash(refreshToken, await genSalt(SALT_ROUNDS));
    return this;
  }

  public async checkRefreshToken(refreshToken: string): Promise<boolean> {
    if (!this.refreshTokenHash) {
      throw new ForbiddenException(REFRESH_TOKEN_NOT_DEFINED);
    }

    return compare(refreshToken, this.refreshTokenHash);
  }

  public fillEntity(user: User): void {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.subscribers = user.subscribers;
    this.createdAt = user.createdAt;
    this.password = user.password;

    if (user.posts) {
      this.posts = user.posts;
    }
    if (user.avatar) {
      this.avatar = user.avatar;
    }
    if (user.refreshTokenHash) {
      this.refreshTokenHash = user.refreshTokenHash;
    }
  }
}
