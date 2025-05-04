import { Document } from "mongoose";


export interface IUstoz extends Document {
    id: string;
    user_id: number;
    name: string;
    age: number;
    texnologiya: string;
    aloqa: string;
    hudud: string;
    narx: string;
    theme: string;
  tag: string;
    murojaat_vaqti: string;
    maqsad: string;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}