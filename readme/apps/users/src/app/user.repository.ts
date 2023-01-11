import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@readme/core';
import { User } from '@readme/shared-types';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async findById(id: string): Promise<User | null> {
    const post = await this.userModel.findById(id).exec();
    if (!post) {
      return null;
    }

    return post.toObject();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({email}).exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, item.toObject(), {new: true}).exec();
  }
}
