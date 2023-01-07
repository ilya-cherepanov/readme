import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../types/user.interface';


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
    unique: true,
  })
  public userId: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
