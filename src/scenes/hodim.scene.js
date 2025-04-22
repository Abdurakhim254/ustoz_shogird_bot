import { Scene } from 'grammy-scenes'
import { UniversalKeyboard } from '../keyboards/index.js';
import { HodimSceneMessages, SomeNeccessaryMessages } from '../messages/index.js';
import { uzbPhoneRegex, viloyatlar } from '../utils/constants/index.js';
import { Shablonizator, createPost,} from '../helpers/functions/index.js';
import { APPLICATION } from '../config/index.js';


export const HodimScene=new Scene("hodim")

const ADMIN_ID=APPLICATION.admin_id


HodimScene.step(async (ctx) => {
    
    await ctx.reply(HodimSceneMessages.ariza);
   
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
            HodimSceneMessages.theme,
            HodimSceneMessages.tag
        )
        await ctx.api.sendMessage(ADMIN_ID,SomeNeccessaryMessages.notification)
        await ctx.reply(SomeNeccessaryMessages.messageGood)
       
    }else if(text===SomeNeccessaryMessages.no){
        await ctx.reply(SomeNeccessaryMessages.messageBad)
            }
       ctx.scene.exit()
});
