import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Comment } from "@readme/shared-types";
import { now, Document } from "mongoose";


@Schema({
  collection: 'comments',
})
export class CommentModel extends Document implements Comment {
  @Prop({
    required: true,
  })
  text: string;

  @Prop({
    required: true,
  })
  authorId: string;

  @Prop({
    required: true,
  })
  postId: number;

  @Prop({
    default: now(),
  })
  createdAt: Date;
}


export const CommentSchema = SchemaFactory.createForClass(CommentModel);
