import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@readme/core';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../types/user.interface';


@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async findAllEmails(): Promise<User[]> {
    return this.userModel.find({}).exec();
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
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
