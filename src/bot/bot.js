import { Bot, session, Keyboard } from "grammy";
import { User } from "../database/index.js";
import dotenv from "dotenv";
import { Jobkeyboard } from "../keyboards/job.keyboard.js";
import { conversations, createConversation } from "@grammyjs/conversations";

dotenv.config();
const token = process.env.BOT_TOKEN;

export const bot = new Bot(token);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(createConversation(greeting));

bot.command("start", async (ctx) => {
  const message =
    "Assalom alaykum Ustoz shogird botidan foydanalinsh uchun ' Share ✅' knopkasini bosing";
  const button = new Keyboard()
    .requestContact("Share ✅", "share")
    .resized()
    .oneTime();
  const username = ctx.update.message.from.username;
  const result = await User.findOne({ username });
  if (!result) {
    await ctx.reply(message, { reply_markup: button });
    return;
  }
  await ctx.reply("Siz ro'yxatdan o'tgansiz ✅");
});

bot.on("message:contact", async (ctx) => {
  try {
    const contact = ctx.message.contact;
    const user = ctx.update.message?.from;
    const result = await User.findOne({ username: user.username });
    if (!result) {
      await User.create({
        user_id: user.id,
        phone_number: contact.phone_number,
        first_name: user.first_name ||"undefined",
        username: user.username ||"undefined",
      });
    }

    const message =
      "Ro'yxatdan muvaffaqiyatli o'tdingiz ✅ Addpost buyrug'ini bosing";

    await ctx.reply(message);
  } catch (error) {
    await ctx.reply(error.message);
  }
});

bot.command("addpost", async (ctx) => {
  await ctx.reply("Quyidagi knopkalardan birini bosing ✅", {
    reply_markup: Jobkeyboard,
  });
});

async function greeting(conversation, ctx) {
    await ctx.reply("Hi there! What is your name?");
    const { message } = await conversation.wait();
    await ctx.reply(`Welcome to the chat, ${message.text}}!`);
  }

  
bot.hears("Sherik kerak", async (ctx) => {
  const message =
    "Sherik topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";
  await ctx.reply(message);
  await ctx.conversation.enter("greeting");
});

bot.hears("Ish joyi kerak", async (ctx) => {
  const message =
    "Ish joyi uchun topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";

  await ctx.reply(message);
  await ctx.conversation.enter("greeting");
});
bot.hears("Hodim kerak", async (ctx) => {
  const message =
    "Hodim topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";

  await ctx.reply(message);
  await ctx.conversation.enter("greeting");
});

bot.hears("Ustoz kerak", async (ctx) => {
  const message =
    "Ustoz topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";

  await ctx.reply(message);
  await ctx.conversation.enter("greeting");
});


bot.hears("Shogird kerak", async (ctx) => {
  const message =
    "Shogird topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";
  await ctx.reply(ctx.msg.text);
});
