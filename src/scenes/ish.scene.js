import { Scene } from "grammy-scenes";
import { IShSceneMessages, SomeNeccessaryMessages } from "../messages/index.js";
import { uzbPhoneRegex, viloyatlar } from "../utils/constants/index.js";
import { UniversalKeyboard } from "../keyboards/index.js";
import { Shablonizator } from "../helpers/functions/index.js";
import { APPLICATION } from "../config/index.js";

export const Ishscene = new Scene("Ish");
const ADMIN_ID=APPLICATION.admin_id


Ishscene.step(async (ctx) => {
  
    await ctx.reply(IShSceneMessages.ariza),
    await ctx.reply(IShSceneMessages.name);
    ctx.scene.resume();
});

Ishscene.wait("get-age").on("message:text", async (ctx) => {
    if(ctx.message.text){
      ctx.session.name = ctx.message.text;
      await ctx.reply(IShSceneMessages.age);
      ctx.scene.resume();
    }else{
        await ctx.reply(IShSceneMessages.name); 
    }
});

Ishscene.wait("get-texnologiya").on("message:text", async (ctx) => {
  if(ctx.message.text && !isNaN(Number(ctx.message.text))){
      ctx.session.age = ctx.message.text;
      await ctx.reply(IShSceneMessages.texnologiya);
      ctx.scene.resume();
  }else{
      await ctx.reply(IShSceneMessages.age);
  }
});

Ishscene.wait("get-aloqa").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.texnologiya = ctx.message.text;
      await ctx.reply(IShSceneMessages.aloqa);
      ctx.scene.resume();
  }else{

      await ctx.reply(IShSceneMessages.aloqa);
    }
});

Ishscene.wait("get-hudud").on("message:text", async (ctx) => {
  
    if(ctx.message.text && uzbPhoneRegex.test(ctx.message.text)){
        ctx.session.aloqa = ctx.message.text;    
        await ctx.reply(IShSceneMessages.hudud);
        ctx.scene.resume();
    }else{

        await ctx.reply(IShSceneMessages.aloqa);
    }
});

Ishscene.wait("get-narx").on("message:text", async (ctx) => {
  if(ctx.message.text && viloyatlar.includes(ctx.message.text.toLowerCase())){
      ctx.session.hudud = ctx.message.text;
      await ctx.reply(IShSceneMessages.narx);
      ctx.scene.resume();
  }else{

      await ctx.reply(IShSceneMessages.hudud);
    }
});

Ishscene.wait("get-kasb").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.narx = ctx.message.text;
      await ctx.reply(IShSceneMessages.kasb);
      ctx.scene.resume();
  }else{

      await ctx.reply(IShSceneMessages.narx);
  }
});

Ishscene.wait("get-muroojaat").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.kasb = ctx.message.text;
      await ctx.reply(IShSceneMessages.muroojaat_vaqti);
      ctx.scene.resume();
  }else{

      await ctx.reply(IShSceneMessages.kasb);
  }
});

Ishscene.wait("get-maqsad").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.muroojaat_vaqti = ctx.message.text;
      await ctx.reply(IShSceneMessages.maqsad);
      ctx.scene.resume();
  }else{
      await ctx.reply(IShSceneMessages.muroojaat_vaqti);

  }
});



Ishscene.wait("last-middleware").on("message:text", async (ctx) => {
    if(ctx.message.text){
        ctx.session.maqsad = ctx.message.text;

        const shablon=await Shablonizator(IShSceneMessages,ctx)
        await ctx.reply(shablon,{
          reply_markup:UniversalKeyboard
        });
        ctx.scene.resume();
    }else{
        await ctx.reply(IShSceneMessages.maqsad);
    }

})

Ishscene.wait("javob").on("message:text", async (ctx) => {
    const text=ctx.message.text.toLocaleLowerCase()
    if(text===SomeNeccessaryMessages.yes){
        await createPost(
            ctx.message.from.id,
            ctx.session.name,
            ctx.session.age,
            ctx.session.texnologiya,
            ctx.session.aloqa,
            ctx.session.hudud,
            ctx.session.narx,
            ctx.session.kasb,
            ctx.session.muroojaat_vaqti,
            ctx.session.maqsad
        )
        await ctx.api.sendMessage(ADMIN_ID,SomeNeccessaryMessages.notification)
       await ctx.reply(SomeNeccessaryMessages.messageGood)
    }else if(text===SomeNeccessaryMessages.no){
       ctx.reply(SomeNeccessaryMessages.messageBad)
    }
       ctx.scene.exit()
});
