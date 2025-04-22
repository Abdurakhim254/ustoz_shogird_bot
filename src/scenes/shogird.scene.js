import { Scene } from 'grammy-scenes'
import { UniversalKeyboard } from '../keyboards/index.js';
import { ShogirdSceneMessages, SomeNeccessaryMessages } from '../messages/index.js';
import { uzbPhoneRegex } from '../utils/constants/index.js';
import { Shablonizator, createPost } from '../helpers/functions/index.js';
import { APPLICATION } from '../config/index.js';


export const Shogirdscene=new Scene("shogird")

const ADMIN_ID=APPLICATION.admin_id



Shogirdscene.step(async (ctx) => {
  
    await ctx.reply(ShogirdSceneMessages.ariza),
    await ctx.reply(ShogirdSceneMessages.name);
    ctx.scene.resume();
});

Shogirdscene.wait("get-age").on("message:text", async (ctx) => {
    if(ctx.message.text){
      ctx.session.name = ctx.message.text;
      await ctx.reply(ShogirdSceneMessages.age);
      ctx.scene.resume();
    }else{
        await ctx.reply(ShogirdSceneMessages.name); 
    }
});

Shogirdscene.wait("get-texnologiya").on("message:text", async (ctx) => {
  if(ctx.message.text && !isNaN(Number(ctx.message.text))){
      ctx.session.age = ctx.message.text;
      await ctx.reply(ShogirdSceneMessages.texnologiya);
      ctx.scene.resume();
  }else{
      await ctx.reply(ShogirdSceneMessages.age);
  }
});

Shogirdscene.wait("get-aloqa").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.texnologiya = ctx.message.text;
      await ctx.reply(ShogirdSceneMessages.aloqa);
      ctx.scene.resume();
  }else{

      await ctx.reply(ShogirdSceneMessages.aloqa);
    }
});

Shogirdscene.wait("get-hudud").on("message:text", async (ctx) => {
  
    if(ctx.message.text && uzbPhoneRegex.test(ctx.message.text)){
        ctx.session.aloqa = ctx.message.text;    
        await ctx.reply(ShogirdSceneMessages.hudud);
        ctx.scene.resume();
    }else{

        await ctx.reply(ShogirdSceneMessages.aloqa);
    }
});

Shogirdscene.wait("get-narx").on("message:text", async (ctx) => {
  if(ctx.message.text && viloyatlar.includes(ctx.message.text.toLowerCase())){
      ctx.session.hudud = ctx.message.text;
      await ctx.reply(ShogirdSceneMessages.narx);
      ctx.scene.resume();
  }else{

      await ctx.reply(ShogirdSceneMessages.hudud);
    }
});

Shogirdscene.wait("get-kasb").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.narx = ctx.message.text;
      await ctx.reply(ShogirdSceneMessages.kasb);
      ctx.scene.resume();
  }else{

      await ctx.reply(ShogirdSceneMessages.narx);
  }
});

Shogirdscene.wait("get-muroojaat").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.kasb = ctx.message.text;
      await ctx.reply(ShogirdSceneMessages.muroojaat_vaqti);
      ctx.scene.resume();
  }else{

      await ctx.reply(ShogirdSceneMessages.kasb);
  }
});

Shogirdscene.wait("get-maqsad").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.muroojaat_vaqti = ctx.message.text;
      await ctx.reply(ShogirdSceneMessages.maqsad);
      ctx.scene.resume();
  }else{
      await ctx.reply(ShogirdSceneMessages.muroojaat_vaqti);

  }
});



Shogirdscene.wait("last-middleware").on("message:text", async (ctx) => {
    if(ctx.message.text){
        ctx.session.maqsad = ctx.message.text;

        const shablon=await Shablonizator(ShogirdSceneMessages,ctx)
        await ctx.reply(shablon,{
          reply_markup:UniversalKeyboard
        });
        ctx.scene.resume();
    }else{
        await ctx.reply(ShogirdSceneMessages.maqsad);
    }

})

Shogirdscene.wait("javob").on("message:text", async (ctx) => {
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
            ctx.session.maqsad,
            ShogirdSceneMessages.theme,
            ShogirdSceneMessages.tag
        )
        await ctx.api.sendMessage(ADMIN_ID,SomeNeccessaryMessages.notification)
       await ctx.reply(SomeNeccessaryMessages.messageGood)
    }else if(text===SomeNeccessaryMessages.no){
       await ctx.reply(SomeNeccessaryMessages.messageBad)
    }
    ctx.scene.exit()
});
