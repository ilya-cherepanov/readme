import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@readme/core';
import { Post, PostStatus } from '@readme/shared-types';
import * as crypto from 'crypto';
import { PostEntity } from '../post.entity';


@Injectable()
export class PostMemoryRepository implements CRUDRepository<PostEntity, string, Post> {
  private repository: Record<string, Post> = {};

  async findById(id: string): Promise<Post | null> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  async findAllPublished(): Promise<Post[]> {
    const publishedPosts = Object.values(this.repository)
      .filter((post) => post.postStatus === PostStatus.Published && post.isRePost === false);

    return publishedPosts;
  }

  async create(item: PostEntity): Promise<Post> {
    const entry = {...item.toObject(), _id: crypto.randomUUID(),};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  async update(id: string, item: PostEntity): Promise<Post> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }

  async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}
