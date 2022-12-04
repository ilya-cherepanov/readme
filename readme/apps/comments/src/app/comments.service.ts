import { Injectable } from '@nestjs/common';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CommentEntity } from './comment.entity';
import { COMMENTS_PER_PAGE, COMMENT_NOT_FOUND } from './comments.constants';
import { CreateCommentDTO } from './dto/create-comment.dto';


@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentMemoryRepository) {}

  async get(postId: string, page = 0) {
    const comments = await this.commentsRepository.findAllByPostId(postId);
    const currentIndex = page * COMMENTS_PER_PAGE;
    const commentSlice = comments.slice(currentIndex, currentIndex + COMMENTS_PER_PAGE)

    return commentSlice;
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

    this.commentsRepository.destroy(id);
  }
}
