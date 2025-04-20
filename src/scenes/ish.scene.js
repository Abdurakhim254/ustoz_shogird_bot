import { Scene } from "grammy-scenes";
import { IShObj } from "../messages/index.js";
import { uzbPhoneRegex, viloyatlar } from "../utils/constants/index.js";
import { Ishkeyboard } from "../keyboards/index.js";
import { User } from "../utils/database/index.js";

export const Ishscene = new Scene("Ish");

Ishscene.step(async (ctx) => {
  
    await ctx.reply(IShObj.ariza),
    await ctx.reply(IShObj.name);
    ctx.scene.resume();
});

Ishscene.wait("get-age").on("message:text", async (ctx) => {
    if(ctx.message.text){
      ctx.session.name = ctx.message.text;
      await ctx.reply(IShObj.age);
      ctx.scene.resume();
    }else{
        await ctx.reply(IShObj.name); 
    }
});

Ishscene.wait("get-texnologiya").on("message:text", async (ctx) => {
  if(ctx.message.text && !isNaN(Number(ctx.message.text))){
      ctx.session.age = ctx.message.text;
      await ctx.reply(IShObj.texnologiya);
      ctx.scene.resume();
  }else{
      await ctx.reply(IShObj.age);
  }
});

Ishscene.wait("get-aloqa").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.texnologiya = ctx.message.text;
      await ctx.reply(IShObj.aloqa);
      ctx.scene.resume();
  }else{

      await ctx.reply(IShObj.aloqa);
    }
});

Ishscene.wait("get-hudud").on("message:text", async (ctx) => {
  
    if(ctx.message.text && uzbPhoneRegex.test(ctx.message.text)){
        ctx.session.aloqa = ctx.message.text;    
        await ctx.reply(IShObj.hudud);
        ctx.scene.resume();
    }else{

        await ctx.reply(IShObj.aloqa);
    }
});

Ishscene.wait("get-narx").on("message:text", async (ctx) => {
  if(ctx.message.text && viloyatlar.includes(ctx.message.text.toLowerCase())){
      ctx.session.hudud = ctx.message.text;
      await ctx.reply(IShObj.narx);
      ctx.scene.resume();
  }else{

      await ctx.reply(IShObj.hudud);
    }
});

Ishscene.wait("get-kasb").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.narx = ctx.message.text;
      await ctx.reply(IShObj.kasb);
      ctx.scene.resume();
  }else{

      await ctx.reply(IShObj.narx);
  }
});

Ishscene.wait("get-muroojaat").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.kasb = ctx.message.text;
      await ctx.reply(IShObj.muroojaat_vaqti);
      ctx.scene.resume();
  }else{

      await ctx.reply(IShObj.kasb);
  }
});

Ishscene.wait("get-maqsad").on("message:text", async (ctx) => {
  if(ctx.message.text){
      ctx.session.muroojaat_vaqti = ctx.message.text;
      await ctx.reply(IShObj.maqsad);
      ctx.scene.resume();
  }else{
      await ctx.reply(IShObj.muroojaat_vaqti);

  }
});



Ishscene.wait("last-middleware").on("message:text", async (ctx) => {
    const user=await User.findOne({user_id:ctx.message.from.id});
    if(ctx.message.text){
        ctx.session.maqsad = ctx.message.text;

        const shablon=`${IShObj.theme}
      
        👨‍💼 Xodim: ${ctx.session.name}
        🕑 Yosh: ${ctx.session.age}
        📚 Texnologiya: ${ctx.session.texnologiya} 
        🇺🇿 Telegram: @${user.username}
        📞 Aloqa: ${ctx.session.aloqa}
        🌐 Hudud: ${ctx.session.hudud} 
        💰 Narxi: ${ctx.session.narx}
        👨🏻‍💻 Kasbi: ${ctx.session.kasb}
        🕰 Murojaat qilish vaqti: ${ctx.session.muroojaat_vaqti} 
        🔎 Maqsad: ${ctx.session.maqsad}
        
        #xodim #${ctx.session.hudud}`
        await ctx.reply(shablon,{
          reply_markup:Ishkeyboard
        });
        ctx.scene.resume();
    }else{
        await ctx.reply(IShObj.maqsad);
    }

})

Ishscene.wait("javob").on("message:text", async (ctx) => {
 const text=ctx.message.text.toLocaleLowerCase()
 if(text==="ha"){

 }else if(text==="yoq"){

 }else{
    
 }
});
