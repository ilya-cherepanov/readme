import { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@readme/shared-types';


@Schema({
  collection: 'users',
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: false,
  })
  avatar?: string;

  @Prop({
    required: true,
  })
  subscribers: number;

  @Prop({
    default: now(),
  })
  createdAt: Date;

  @Prop({
    required: false,
  })
  refreshTokenHash?: string
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
