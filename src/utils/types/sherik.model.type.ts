import { Document } from "mongoose";

export interface ISherik extends Document {
  id: string;
  user_id: number;
  name: string;
  texnologiya: string;
  aloqa: string;
  hudud: string;
  narxi: string;
  kasbi: string;
  theme: string;
  tag: string;
  murojaat_vaqti: string;
  maqsad: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}