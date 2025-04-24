import { Context, SessionFlavor } from "grammy";
import { ScenesSessionData,ScenesFlavor } from "grammy-scenes";

// Extend your session data
export interface SessionData extends ScenesSessionData {
    messageIds: number[];
}

// Create MyContext type by merging SessionFlavor with Context and the extended SessionData
export type BotContext = Context & SessionFlavor<SessionData> & ScenesFlavor
