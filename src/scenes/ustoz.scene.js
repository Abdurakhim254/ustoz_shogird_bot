import { Scene } from 'grammy-scenes'
import { UniversalKeyboard } from '../keyboards/index.js';
import { SomeNeccessaryMessages, UstozSceneMessages } from '../messages/index.js';
import { uzbPhoneRegex } from '../utils/constants/index.js';
import { Shablonizator, createPost } from '../helpers/functions/index.js';
import { APPLICATION } from '../config/index.js';


export const Ustozscene=new Scene("ustoz")

const ADMIN_ID=APPLICATION.admin_id

Ustozscene.step(async (ctx) => {
  
    await ctx.reply(UstozSceneMessages.ariza),
    await ctx.reply(UstozSceneMessages.name);
    ctx.scene.resume();
});

Ustozscene.wait("get-age").on("message:text", async (ctx) => {
    if(ctx.message.text){
      ctx.session.name = ctx.message.text;
      await ctx.reply(UstozSceneMessages.age);
      ctx.scene.resume();
    }else{
        await ctx.reply(UstozSceneMessages.name); 
    }
});

Ustozscene.wait("get-texnologiya").on("message:text", async (ctx) => {
  if(ctx.message.text && !isNaN(Number(ctx.message.text))){
      ctx.session.age = ctx.message.text;
      await ctx.reply(UstozSceneMessages.texnologiya);
      ctx.scene.resume();
  }else{
      await ctx.reply(UstozSceneMessages.age);
  }
});

Ustozscene.wait("get-aloqa").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.texnologiya = ctx.message.text;
      await ctx.reply(UstozSceneMessages.aloqa);
      ctx.scene.resume();
  }else{

      await ctx.reply(UstozSceneMessages.aloqa);
    }
});

Ustozscene.wait("get-hudud").on("message:text", async (ctx) => {
  
    if(ctx.message.text && uzbPhoneRegex.test(ctx.message.text)){
        ctx.session.aloqa = ctx.message.text;    
        await ctx.reply(UstozSceneMessages.hudud);
        ctx.scene.resume();
    }else{

        await ctx.reply(UstozSceneMessages.aloqa);
    }
});

Ustozscene.wait("get-narx").on("message:text", async (ctx) => {
  if(ctx.message.text && viloyatlar.includes(ctx.message.text.toLowerCase())){
      ctx.session.hudud = ctx.message.text;
      await ctx.reply(UstozSceneMessages.narx);
      ctx.scene.resume();
  }else{

      await ctx.reply(UstozSceneMessages.hudud);
    }
});

Ustozscene.wait("get-kasb").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.narx = ctx.message.text;
      await ctx.reply(UstozSceneMessages.kasb);
      ctx.scene.resume();
  }else{

      await ctx.reply(UstozSceneMessages.narx);
  }
});

Ustozscene.wait("get-muroojaat").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.kasb = ctx.message.text;
      await ctx.reply(UstozSceneMessages.muroojaat_vaqti);
      ctx.scene.resume();
  }else{

      await ctx.reply(UstozSceneMessages.kasb);
  }
});

Ustozscene.wait("get-maqsad").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.muroojaat_vaqti = ctx.message.text;
      await ctx.reply(UstozSceneMessages.maqsad);
      ctx.scene.resume();
  }else{
      await ctx.reply(UstozSceneMessages.muroojaat_vaqti);

  }
});



Ustozscene.wait("last-middleware").on("message:text", async (ctx) => {
    if(ctx.message.text){
        ctx.session.maqsad = ctx.message.text;

        const shablon=await Shablonizator(UstozSceneMessages,ctx)

        await ctx.reply(shablon,{
            reply_markup:UniversalKeyboard
        });
        ctx.scene.resume();
    }else{
        await ctx.reply(UstozSceneMessages.maqsad);
    }

})

Ustozscene.wait("javob").on("message:text", async (ctx) => {
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
        UstozSceneMessages.theme,
        UstozSceneMessages.tag,
    )
    await ctx.api.sendMessage(ADMIN_ID,SomeNeccessaryMessages.notification)
    await ctx.reply(SomeNeccessaryMessages.messageGood)
 }else if(text===SomeNeccessaryMessages.no){
   await ctx.reply(SomeNeccessaryMessages.messageBad)
 }
    ctx.scene.exit()
});
