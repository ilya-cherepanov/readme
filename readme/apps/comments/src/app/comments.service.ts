import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { COMMENT_NOT_FOUND } from './comments.constants';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { GetCommentsQuery } from './query/get-comments.query';


@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentRepository) {}

  async get(postId: number, query: GetCommentsQuery) {
    const skip = query.page * query.quantity;
    return this.commentsRepository.findAllByPostId(postId, query.quantity, skip);
  }

  async create(newComment: CreateCommentDTO) {
    const newCommentEntity = new CommentEntity({
      ...newComment,
      createdAt: new Date(),
    });

    return this.commentsRepository.create(newCommentEntity);
  }

  async delete(id: string) {
    if (!this.commentsRepository.findById(id)) {
      throw new Error(COMMENT_NOT_FOUND);
    }

    await this.commentsRepository.destroy(id);
  }
}
