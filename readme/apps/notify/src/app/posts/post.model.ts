import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from '../../types/post.intefrace';


@Schema({
  collection: 'posts',
})
export class PostModel extends Document implements Post {
  @Prop({
    required: true,
  })
  public title: string;

  @Prop({
    required: true,
  })
  public postId: number;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
