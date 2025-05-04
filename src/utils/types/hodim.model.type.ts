import { Document } from "mongoose";

export interface IHodim extends Document {
  id: string;
  user_id: number;
  name: string;
  texnologiya: string;
  hudud: string;
  masul: string;
  narx:string;
  murojaat_vaqti: string;
  ish_vaqti: string;
  theme: string;
  tag: string;
  maqsad: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
