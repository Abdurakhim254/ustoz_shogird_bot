import { Context, SessionFlavor } from "grammy";
import { ScenesSessionData, ScenesFlavor } from "grammy-scenes";

export  interface SessionData extends ScenesSessionData {
    messageIds: number[];
  }

export type BotContext = Context & SessionFlavor<SessionData> & ScenesFlavor;
