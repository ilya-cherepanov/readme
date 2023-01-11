import { CRUDRepository } from '@readme/core';
import { CommentEntity } from './comment.entity';
import { Comment } from '@readme/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, number, Comment> {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  public async create(item: CommentEntity): Promise<Comment> {
    return this.prismaService.comment.create({
      data: item.toObject(),
    });
  }

  public async findById(id: number): Promise<Comment | null> {
    return this.prismaService.comment.findFirst({
      where: {id},
    });
  }

  public async findAllByPostId(postId: number, limit: number, skip: number): Promise<Comment[]> {
    return this.prismaService.comment.findMany({
      where: {postId},
      skip,
      take: limit,
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prismaService.comment.delete({where: {id}});
  }

  public async update(id: number, item: CommentEntity): Promise<Comment> {
    return this.prismaService.comment.update({where: {id}, data: item.toObject()});
  }
}
