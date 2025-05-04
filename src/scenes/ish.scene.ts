import { Scene } from "grammy-scenes";
import { AddType, BotContext, IJob, Job, uzbPhoneRegex, viloyatlar } from "../utils";
import { ErrorMessages, IShSceneMessages, SomeNeccessaryMessages } from "../messages";
import {  FormatService, UniversalService, messageDeleter } from "../helpers";
import { UniversalKeyboard } from "../keyboards";
import { APPLICATION } from "../config";

export const Ishscene = new Scene<BotContext>("Ish");

const formatservice=new FormatService()
const universalService=new UniversalService<IJob>(Job)

Ishscene.step(async (ctx) => {
  ctx.session.messageIds = [];
  (ctx as any).session.chatId = ctx.chat?.id;
  var message=await ctx.reply(IShSceneMessages.ariza);
  ctx.session.messageIds.push(message.message_id);
  var message=await ctx.reply(IShSceneMessages.name);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Ishscene.wait("get-age").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);
     (ctx as any).session.name = ctx.message.text;
  const message=await ctx.reply(IShSceneMessages.age);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Ishscene.wait("get-texnologiya").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.age = ctx.message.text;
  const message=await ctx.reply(IShSceneMessages.texnologiya);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Ishscene.wait("get-aloqa").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.texnologiya = ctx.message.text;
  const message=await ctx.reply(IShSceneMessages.aloqa);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Ishscene.wait("get-narx").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);

  if (uzbPhoneRegex.test(ctx.message.text) && ctx.message.text) {
    (ctx as any).session.aloqa = ctx.message.text;
    const message=await ctx.reply(IShSceneMessages.narx);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
  } else {
    const message=await ctx.reply(IShSceneMessages.aloqa);
    ctx.session.messageIds.push(message.message_id);
  }
});

Ishscene.wait("get-hudud").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.narx = ctx.message.text;
  const message=await ctx.reply(IShSceneMessages.hudud);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Ishscene.wait("get-kasb").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);

  if (viloyatlar.includes(ctx.message.text.toLowerCase())) {
    (ctx as any).session.hudud = ctx.message.text;
    const message=await ctx.reply(IShSceneMessages.kasb);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
  } else {
    const message=await ctx.reply(IShSceneMessages.hudud);
    ctx.session.messageIds.push(message.message_id);
  }
});

Ishscene.wait("get-murojaat").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.kasb = ctx.message.text;
  const message=await ctx.reply(IShSceneMessages.murojaat_vaqti);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Ishscene.wait("get-maqsad").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.murojaat_vaqti = ctx.message.text;
 const message= await ctx.reply(IShSceneMessages.maqsad);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Ishscene.wait("get-template").on("message:text", async (ctx) => {
  (ctx as any).session.maqsad = ctx.message.text;
  (ctx as any).session.tag = IShSceneMessages.tag;
  (ctx as any).session.theme = IShSceneMessages.theme;
  (ctx as any ).session.user_id=ctx.from.id
  const format = await formatservice.createTemplate((ctx as any).session, AddType.ISH);
if (format) {
  await ctx.reply(format, { reply_markup: UniversalKeyboard });
};

  ctx.scene.resume();
});

Ishscene.wait("last-middleware").on("message:text", async (ctx) => {
    const query = ctx.message.text.toLocaleLowerCase();
    await messageDeleter(ctx);
  
    try {
      if (query === SomeNeccessaryMessages.yes) {
        await universalService.create((ctx as any).session);
        await ctx.api.sendMessage(APPLICATION.admin_id, SomeNeccessaryMessages.notification);
        await ctx.reply(SomeNeccessaryMessages.messageGood);
  
      } else if (query === SomeNeccessaryMessages.no) {
        await ctx.reply(SomeNeccessaryMessages.messageBad);
      }
    } catch (error) {
      const err = error as any;
      if (err.error_code === 403) {
        await ctx.reply(ErrorMessages.error);
      } else {
        await ctx.reply(ErrorMessages.error);
      }
    }
  
    ctx.scene.exit();
});
