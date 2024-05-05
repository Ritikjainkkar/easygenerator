import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
@Schema({
  timestamps: true,
})
export class User {
  toObject(): any {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
