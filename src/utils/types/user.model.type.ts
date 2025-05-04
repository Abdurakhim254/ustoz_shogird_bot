import { Document } from "mongoose";

export interface IUser extends Document {
  user_id: number;
  phone_number: number;
  first_name: string;
  username?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
