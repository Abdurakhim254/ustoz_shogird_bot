import { Bot, session } from "grammy";
import { User } from "../utils/database/index.js";
import { conversations } from "@grammyjs/conversations";
import { scenes } from "../scenes/index.js";
import { MAIN_MESSAGES } from "../messages/main.messages.js";
import { getcontact, Jobkeyboard, Addpost } from "../keyboards/index.js";
import { APPLICATION } from "../config/index.js";
import { messageDeleter } from "../helpers/functions/index.js";

const token = APPLICATION.token;

export const bot = new Bot(token);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(scenes.manager());
bot.use(scenes);

bot.command("start", async (ctx) => {
  const id = ctx.update.message.from.id;
  ctx.session.messageIds=[]
  const result = await User.findOne({ user_id: id });
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
    const contact = ctx.message.contact;
    ctx.session.messageIds.push(ctx.update.message.message_id)
    const user = ctx.update.message?.from;
    const result = await User.findOne({ username: user.username });
    if (!result) {
      await User.create({
        user_id: user.id,
        phone_number: contact.phone_number,
        first_name: user.first_name || "undefined",
        username: user.username || "undefined",
      });
    }

    const message = await ctx.reply(MAIN_MESSAGES.successmessage, {
      reply_markup: Addpost,
    });
    ctx.session.messageIds.push(message.message_id)
    await messageDeleter(ctx.session.messageIds)
  } catch (error) {
    await ctx.reply(error.message);
  }
});



bot.callbackQuery("addPost", async (ctx) => {

  const message = await ctx.reply(MAIN_MESSAGES.ToStartTypes, {
    reply_markup: Jobkeyboard,
  });
  ctx.session.messageIds.push(message.message_id)
});

bot.callbackQuery("sherik", async (ctx) => {
  await ctx.scenes.enter("sherik");
});

bot.callbackQuery("ish", async (ctx) => {
  await ctx.scenes.enter("Ish");
});

bot.callbackQuery("hodim", async (ctx) => {
  await ctx.scenes.enter("hodim");
});

bot.callbackQuery("ustoz", async (ctx) => {
  await ctx.scenes.enter("ustoz");
});

bot.callbackQuery("shogird", async (ctx) => {
  await ctx.scenes.enter("shogird");
});

