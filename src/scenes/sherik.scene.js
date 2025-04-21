import { Scene } from 'grammy-scenes'
import { UniversalKeyboard } from '../keyboards/index.js';
import { SherikSceneMessages, SomeNeccessaryMessages } from '../messages/index.js';
import { uzbPhoneRegex } from '../utils/constants/index.js';
import { Shablonizator } from '../helpers/functions/index.js';


export const Sherikscene=new Scene("sherik")

Sherikscene.step(async(ctx)=>{
    await ctx.reply("sherik")
})


Sherikscene.step(async (ctx) => {
  
    await ctx.reply(SherikSceneMessages.ariza),
    await ctx.reply(SherikSceneMessages.name);
    ctx.scene.resume();
});

Sherikscene.wait("get-age").on("message:text", async (ctx) => {
    if(ctx.message.text){
      ctx.session.name = ctx.message.text;
      await ctx.reply(SherikSceneMessages.age);
      ctx.scene.resume();
    }else{
        await ctx.reply(SherikSceneMessages.name); 
    }
});

Sherikscene.wait("get-texnologiya").on("message:text", async (ctx) => {
  if(ctx.message.text && !isNaN(Number(ctx.message.text))){
      ctx.session.age = ctx.message.text;
      await ctx.reply(SherikSceneMessages.texnologiya);
      ctx.scene.resume();
  }else{
      await ctx.reply(SherikSceneMessages.age);
  }
});

Sherikscene.wait("get-aloqa").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.texnologiya = ctx.message.text;
      await ctx.reply(SherikSceneMessages.aloqa);
      ctx.scene.resume();
  }else{

      await ctx.reply(SherikSceneMessages.aloqa);
    }
});

Sherikscene.wait("get-hudud").on("message:text", async (ctx) => {
  
    if(ctx.message.text && uzbPhoneRegex.test(ctx.message.text)){
        ctx.session.aloqa = ctx.message.text;    
        await ctx.reply(SherikSceneMessages.hudud);
        ctx.scene.resume();
    }else{

        await ctx.reply(SherikSceneMessages.aloqa);
    }
});

Sherikscene.wait("get-narx").on("message:text", async (ctx) => {
  if(ctx.message.text && viloyatlar.includes(ctx.message.text.toLowerCase())){
      ctx.session.hudud = ctx.message.text;
      await ctx.reply(SherikSceneMessages.narx);
      ctx.scene.resume();
  }else{

      await ctx.reply(SherikSceneMessages.hudud);
    }
});

Sherikscene.wait("get-kasb").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.narx = ctx.message.text;
      await ctx.reply(SherikSceneMessages.kasb);
      ctx.scene.resume();
  }else{

      await ctx.reply(SherikSceneMessages.narx);
  }
});

Sherikscene.wait("get-muroojaat").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.kasb = ctx.message.text;
      await ctx.reply(SherikSceneMessages.muroojaat_vaqti);
      ctx.scene.resume();
  }else{

      await ctx.reply(SherikSceneMessages.kasb);
  }
});

Sherikscene.wait("get-maqsad").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.muroojaat_vaqti = ctx.message.text;
      await ctx.reply(SherikSceneMessages.maqsad);
      ctx.scene.resume();
  }else{
      await ctx.reply(SherikSceneMessages.muroojaat_vaqti);

  }
});



Sherikscene.wait("last-middleware").on("message:text", async (ctx) => {
    if(ctx.message.text){
        ctx.session.maqsad = ctx.message.text;

        const shablon=await Shablonizator(SherikSceneMessages,ctx)
        await ctx.reply(shablon,{
          reply_markup:UniversalKeyboard
        });
        ctx.scene.resume();
    }else{
        await ctx.reply(SherikSceneMessages.maqsad);
    }

})






Sherikscene.wait("javob").on("message:text", async (ctx) => {
    const text=ctx.message.text.toLocaleLowerCase()
    if(text===SomeNeccessaryMessages.yes){
       await ctx.reply(SomeNeccessaryMessages.messageGood)
    }else if(text===SomeNeccessaryMessages.no){
       ctx.reply(SomeNeccessaryMessages.messageBad)
    }
       ctx.scene.exit()
});
