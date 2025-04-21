import { Scene } from 'grammy-scenes'
import { UniversalKeyboard } from '../keyboards/index.js';
import { HodimSceneMessages } from '../messages/index.js';
import { uzbPhoneRegex } from '../utils/constants/index.js';
import { Shablonizator } from '../helpers/functions/index.js';


export const HodimScene=new Scene("hodim")

HodimScene.step(async(ctx)=>{
    await ctx.reply("hodim")
})


HodimScene.step(async (ctx) => {
  
    await ctx.reply(HodimSceneMessages.ariza),
    await ctx.reply(HodimSceneMessages.name);
    ctx.scene.resume();
});

HodimScene.wait("get-age").on("message:text", async (ctx) => {
    if(ctx.message.text){
      ctx.session.name = ctx.message.text;
      await ctx.reply(HodimSceneMessages.age);
      ctx.scene.resume();
    }else{
        await ctx.reply(HodimSceneMessages.name); 
    }
});

HodimScene.wait("get-texnologiya").on("message:text", async (ctx) => {
  if(ctx.message.text && !isNaN(Number(ctx.message.text))){
      ctx.session.age = ctx.message.text;
      await ctx.reply(HodimSceneMessages.texnologiya);
      ctx.scene.resume();
  }else{
      await ctx.reply(HodimSceneMessages.age);
  }
});

HodimScene.wait("get-aloqa").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.texnologiya = ctx.message.text;
      await ctx.reply(HodimSceneMessages.aloqa);
      ctx.scene.resume();
  }else{

      await ctx.reply(HodimSceneMessages.texnologiya);
    }
});

HodimScene.wait("get-hudud").on("message:text", async (ctx) => {
  
    if(ctx.message.text && uzbPhoneRegex.test(ctx.message.text)){
        ctx.session.aloqa = ctx.message.text;    
        await ctx.reply(HodimSceneMessages.hudud);
        ctx.scene.resume();
    }else{

        await ctx.reply(HodimSceneMessages.aloqa);
    }
});

HodimScene.wait("get-narx").on("message:text", async (ctx) => {
  if(ctx.message.text && viloyatlar.includes(ctx.message.text.toLowerCase())){
      ctx.session.hudud = ctx.message.text;
      await ctx.reply(HodimSceneMessages.narx);
      ctx.scene.resume();
  }else{

      await ctx.reply(HodimSceneMessages.hudud);
    }
});

HodimScene.wait("get-kasb").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.narx = ctx.message.text;
      await ctx.reply(HodimSceneMessages.kasb);
      ctx.scene.resume();
  }else{

      await ctx.reply(HodimSceneMessages.narx);
  }
});

HodimScene.wait("get-muroojaat").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.kasb = ctx.message.text;
      await ctx.reply(HodimSceneMessages.muroojaat_vaqti);
      ctx.scene.resume();
  }else{

      await ctx.reply(HodimSceneMessages.kasb);
  }
});

HodimScene.wait("get-maqsad").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.muroojaat_vaqti = ctx.message.text;
      await ctx.reply(HodimSceneMessages.maqsad);
      ctx.scene.resume();
  }else{
      await ctx.reply(HodimSceneMessages.muroojaat_vaqti);

  }
});



HodimScene.wait("last-middleware").on("message:text", async (ctx) => {

    if(ctx.message.text){
        ctx.session.maqsad = ctx.message.text;

        const shablon=await Shablonizator(HodimSceneMessages,ctx)
        await ctx.reply(shablon,{
          reply_markup:UniversalKeyboard
        });
        ctx.scene.resume();
    }else{
        await ctx.reply(HodimSceneMessages.maqsad);
    }

})

HodimScene.wait("javob").on("message:text", async (ctx) => {
 const text=ctx.message.text.toLocaleLowerCase()
 if(text==="ha"){
    ctx.reply("ha")
 }else if(text==="yoq"){
    ctx.reply("yoq")
 }else{
    ctx.reply("orta")
 }
});
