import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@readme/core';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity } from './post.entity';
import { Post } from '../../types/post.intefrace';
import { PostModel } from './post.model';


@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, string, Post> {
  constructor(
    @InjectModel(PostModel.name) private readonly postModel: Model<PostModel>,
  ) {}

  public async create(item: PostEntity): Promise<Post> {
    const newUser = new this.postModel(item.toObject());
    return newUser.save();
  }

  public async findById(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  public async findAll(): Promise<Post[]> {
    return this.postModel.find({}).exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id).exec();
  }

  public async destroyAll(): Promise<void> {
    await this.postModel.deleteMany({}).exec();
  }

  public async update(id: string, item: PostEntity): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, item.toObject(), {new: true}).exec();
  }
}
