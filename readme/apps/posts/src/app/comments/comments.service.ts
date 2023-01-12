import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../general/post.repository';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { COMMENT_NOT_FOUND } from './comments.constants';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { GetCommentsQuery } from './query/get-comments.query';


@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async get(postId: number, query: GetCommentsQuery) {
    const skip = query.page * query.quantity;
    return this.commentsRepository.findAllByPostId(postId, query.quantity, skip);
  }

  async create(userId: string, newComment: CreateCommentDTO) {
    const post = await this.postRepository.findById(newComment.postId);
    if (!post) {
      throw new BadRequestException('Post with given id does not exist!');
    }

    const newCommentEntity = new CommentEntity({
      ...newComment,
      authorId: userId,
      createdAt: new Date(),
    });

    return this.commentsRepository.create(newCommentEntity);
  }

  async delete(id: number, userId: string) {
    const comment = await this.commentsRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }
    if (comment.authorId !== userId) {
      throw new ForbiddenException('User is not the author of the comment!');
    }

    await this.commentsRepository.destroy(id);
  }
}
