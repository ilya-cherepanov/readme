import { CRUDRepository } from '@readme/core';
import { CommentEntity } from './comment.entity';
import { Comment } from '@readme/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentModel } from './comment.model';
import { Model } from 'mongoose';


@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, string, Comment> {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>
  ) {}

  public async create(item: CommentEntity): Promise<Comment> {
    const newComment = new this.commentModel(item);
    return newComment.save();
  }

  public async findById(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).exec();
  }

  public async findAllByPostId(postId: number): Promise<Comment[]> {
    return this.commentModel.find({postId}).exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.commentModel.deleteOne({id});
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    return this.commentModel.findByIdAndUpdate(id, item.toObject(), {new: true}).exec();
  }
}
