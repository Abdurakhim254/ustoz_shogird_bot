import { Context, SessionFlavor } from "grammy";
import { ScenesSessionData,ScenesFlavor } from "grammy-scenes";

export interface SessionData extends ScenesSessionData {
    messageIds: number[];
}

export interface ShablonProps{
    user_id:number;
    name:string;
    age:number;
    texnologiya:string
    aloqa:string;
    narx:string;
    hudud:string;
    kasb:string;
    murojaat_vaqti:string;
    maqsad:String;
    theme:String;
    tag:string
}

export type BotContext = Context & SessionFlavor<SessionData> & ScenesFlavor
