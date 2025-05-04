import { Scene } from "grammy-scenes";
import {
  AddType,
  BotContext,
  ISherik,
  Sherik,
  uzbPhoneRegex,
  viloyatlar,
} from "../utils";
import {
  ErrorMessages,
  SherikSceneMessages,
  SomeNeccessaryMessages,
} from "../messages";
import { APPLICATION } from "../config";
import { UniversalKeyboard } from "../keyboards";
import { FormatService, UniversalService, messageDeleter } from "../helpers";

export const Sherikscene = new Scene<BotContext>("sherik");

const formatservice = new FormatService();
const universalService = new UniversalService<ISherik>(Sherik);

Sherikscene.step(async (ctx) => {
  ctx.session.messageIds = [];
  (ctx as any).session.chatId = ctx.chat?.id;
  var message = await ctx.reply(SherikSceneMessages.ariza);
  ctx.session.messageIds.push(message.message_id);
  var message = await ctx.reply(SherikSceneMessages.name);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Sherikscene.wait("get-texnologiya").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.name = ctx.message.text;
  const message = await ctx.reply(SherikSceneMessages.texnologiya);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Sherikscene.wait("get-aloqa").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.texnologiya = ctx.message.text;
  const message = await ctx.reply(SherikSceneMessages.aloqa);
  ctx.session.messageIds.push(message.message_id);

  ctx.scene.resume();
});

Sherikscene.wait("get-hudud").on("message:text", async (ctx) => {
  if (uzbPhoneRegex.test(ctx.message.text) && ctx.message.text) {
    (ctx as any).session.aloqa = ctx.message.text;
    const message = await ctx.reply(SherikSceneMessages.hudud);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
  } else {
    const message = await ctx.reply(SherikSceneMessages.aloqa);
    ctx.session.messageIds.push(message.message_id);
  }
});

Sherikscene.wait("get-narx").on("message:text", async (ctx) => {
  if (viloyatlar.includes(ctx.message.text.toLowerCase())) {
    (ctx as any).session.hudud = ctx.message.text;
    const message = await ctx.reply(SherikSceneMessages.narx);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
  } else {
    const message = await ctx.reply(SherikSceneMessages.hudud);
    ctx.session.messageIds.push(message.message_id);
  }
});

Sherikscene.wait("get-murojaat").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.narx = ctx.message.text;
  const message = await ctx.reply(SherikSceneMessages.murojaat_vaqti);
  ctx.session.messageIds.push(message.message_id);

  ctx.scene.resume();
});

Sherikscene.wait("get-maqsad").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);

  (ctx as any).session.murojaat_vaqti = ctx.message.text;
  const message = await ctx.reply(SherikSceneMessages.maqsad);
  ctx.session.messageIds.push(message.message_id);
  ctx.scene.resume();
});

Sherikscene.wait("get-template").on("message:text", async (ctx) => {
  ctx.session.messageIds.push(ctx.msg?.message_id);
  (ctx as any).session.maqsad = ctx.message.text;
  (ctx as any).session.tag = SherikSceneMessages.tag;
  (ctx as any).session.theme = SherikSceneMessages.theme;
  (ctx as any).session.user_id = ctx.from.id;
  const format = await formatservice.createTemplate(
    (ctx as any).session,
    AddType.ISH
  );
  if (format) {
    await ctx.reply(format, { reply_markup: UniversalKeyboard });
  }

  ctx.scene.resume();
});

Sherikscene.wait("last-middleware").on("message:text", async (ctx) => {
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
