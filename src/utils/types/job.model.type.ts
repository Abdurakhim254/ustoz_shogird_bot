import { Document } from "mongoose";

export interface IJob extends Document {
  id: string;
  user_id: number;
  name: string;
  age: string;
  texnologiya: string;
  aloqa: string;
  hudud: string;
  narx: string;
  kasb: string;
  theme: string;
  tag: string;
  murojaat_vaqti: string;
  maqsad: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
