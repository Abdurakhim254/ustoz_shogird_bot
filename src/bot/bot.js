import { Bot, session } from "grammy";
import { conversations } from "@grammyjs/conversations";
import { scenes } from "../scenes/index.js";
import { MAIN_MESSAGES } from "../messages/main.messages.js";
import { getcontact, Jobkeyboard, Addpost } from "../keyboards/index.js";
import { APPLICATION } from "../config/index.js";
import { CreateUser, getUser, messageDeleter } from "../helpers/functions/index.js";

const token = APPLICATION.token;

export const bot = new Bot(token);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(scenes.manager());
bot.use(scenes);

bot.command("start", async (ctx) => {
  const id = ctx.update.message.from.id;
  ctx.session.chatId=ctx.chat?.id
  ctx.session.messageIds=[]
  const result = await getUser(id);
  if (!result) {
    const message=await ctx.reply(MAIN_MESSAGES.AskContact, { reply_markup: getcontact });
    ctx.session.messageIds.push(message.message_id)
    return;
  }

 const message = await ctx.reply(MAIN_MESSAGES.ToStartAdd, {
    reply_markup: Addpost,
  });

  ctx.session.messageIds.push(message.message_id)
});

bot.command("admin", async (ctx) => {
  await ctx.scenes.enter("admin");
});

bot.on("message:contact", async (ctx) => {
  try {
    const user = ctx.update.message?.from;
    const result =await getUser(user.id)
    if (!result) {
      await CreateUser(ctx);
    }

    const message = await ctx.reply(MAIN_MESSAGES.successmessage, {
      reply_markup: Addpost,
    });

    ctx.session.messageIds.push(message.message_id)
    
  } catch (error) {
    await ctx.reply(error.message);
  }
});



bot.callbackQuery("addPost", async (ctx) => {

  await ctx.reply(MAIN_MESSAGES.ToStartTypes, {
    reply_markup: Jobkeyboard,
  });
  
});

bot.callbackQuery("sherik", async (ctx) => {
  await messageDeleter(ctx);

  await ctx.scenes.enter("sherik");
});

bot.callbackQuery("ish", async (ctx) => {
  await messageDeleter(ctx);

  await ctx.scenes.enter("Ish");
});

bot.callbackQuery("hodim", async (ctx) => {
  await messageDeleter(ctx);

  await ctx.scenes.enter("hodim");
});

bot.callbackQuery("ustoz", async (ctx) => {
  await messageDeleter(ctx);

  await ctx.scenes.enter("ustoz");
});

bot.callbackQuery("shogird", async (ctx) => {
  await messageDeleter(ctx);

  await ctx.scenes.enter("shogird");
});

