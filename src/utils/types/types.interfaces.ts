import { Context, SessionFlavor } from "grammy";
import { ScenesSessionData,ScenesFlavor } from "grammy-scenes";
import mongoose, { Document, Schema } from "mongoose";


export interface SessionData extends ScenesSessionData {
    messageIds: number[];
}

export interface Ipost extends Document{
    user_id:number;
    name: string;
    age: number;
    texnologiya: string;
    aloqa: string;
    hudud: string;
    narx: string;
    kasb: string;
    murojaat_vaqti: string;
    maqsad: string;
    theme: string;
    tag: string;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

export type BotContext = Context & SessionFlavor<SessionData> & ScenesFlavor
