import { Scene } from "grammy-scenes";
import { AddType, BotContext, Hodim, IHodim, uzbPhoneRegex, viloyatlar } from "../utils";
import { FormatService, UniversalService, messageDeleter } from "../helpers";
import {
  ErrorMessages,
  HodimSceneMessages,
  SomeNeccessaryMessages,
} from "../messages";
import { UniversalKeyboard } from "../keyboards";
import { APPLICATION } from "../config";

export const HodimScene = new Scene<BotContext>("hodim");

const formatservice = new FormatService();
const universalService = new UniversalService<IHodim>(Hodim);

HodimScene.step(async (ctx) => {
  ctx.session.messageIds = [];
  (ctx as any).session.chatId = ctx.chat?.id;

  var message = await ctx.reply(HodimSceneMessages.ariza);
  ctx.session.messageIds.push(message.message_id);

  var message = await ctx.reply(HodimSceneMessages.Idora);
  ctx.session.messageIds.push(message.message_id);

  ctx.scene.resume();
});

HodimScene.wait("get-texnologiya").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.idora = ctx.message.text;
  const message = await ctx.reply(HodimSceneMessages.texnologiya);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

HodimScene.wait("get-texnologiya").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.texnologiya = ctx.message.text;
  const message = await ctx.reply(HodimSceneMessages.aloqa);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

HodimScene.wait("get-hudud").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);
  if (uzbPhoneRegex.test(ctx.message.text) && ctx.message.text) {
    (ctx as any).session.aloqa = ctx.message.text;
    const message = await ctx.reply(HodimSceneMessages.hudud);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
  } else {
    const message = await ctx.reply(HodimSceneMessages.aloqa);
    ctx.session.messageIds.push(message.message_id);
  }
});

HodimScene.wait("get-masul").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  if (viloyatlar.includes(ctx.message.text.toLowerCase())) {
    (ctx as any).session.hudud = ctx.message.text;
    const message = await ctx.reply(HodimSceneMessages.masul);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
  } else {
    const message = await ctx.reply(HodimSceneMessages.hudud);
    ctx.session.messageIds.push(message.message_id);
  }
});

HodimScene.wait("get-murojaat").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.masul = ctx.message.text;
  const message = await ctx.reply(HodimSceneMessages.murojaat_vaqti);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});
HodimScene.wait("get-ish-vaqti").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.murojaat_vaqti = ctx.message.text;
  const message = await ctx.reply(HodimSceneMessages.ish_vaqti);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

HodimScene.wait("get-narx").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.ish_vaqti = ctx.message.text;
  const message = await ctx.reply(HodimSceneMessages.narx);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

HodimScene.wait("get-maqsad").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.narx = ctx.message.text;
  const message = await ctx.reply(HodimSceneMessages.qoshimcha);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

HodimScene.wait("get-template").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.qoshimcha = ctx.message.text;
  (ctx as any).session.tag = HodimSceneMessages.tag;
  (ctx as any).session.theme = HodimSceneMessages.theme;
  (ctx as any).session.user_id = ctx.from.id;
  const format = await formatservice.createTemplate(
    (ctx as any).session,
    AddType.HODIM
  );
  if (format) {
    await ctx.reply(format, { reply_markup: UniversalKeyboard });
  }

  ctx.scene.resume();
});

HodimScene.wait("last-middleware").on("message:text", async (ctx) => {
  const query = ctx.message.text.toLocaleLowerCase();
  await messageDeleter(ctx);
  try {
    if (query === SomeNeccessaryMessages.yes) {
      await universalService.create((ctx as any).session);
      await ctx.api.sendMessage(
        APPLICATION.admin_id,
        SomeNeccessaryMessages.notification
      );
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
