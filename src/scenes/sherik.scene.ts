import {Scene} from "grammy-scenes"
import { BotContext, uzbPhoneRegex, viloyatlar } from "../utils"
import { SherikSceneMessages, SomeNeccessaryMessages } from "../messages"
import { APPLICATION } from "../config"
import { UniversalKeyboard } from "../keyboards"
import { FormatService, PostService } from "../helpers"



export const Sherikscene=new Scene<BotContext>("sherik")

const formatservice=new FormatService()
const postservice=new PostService()


Sherikscene.step(async(ctx)=>{
    await ctx.reply(SherikSceneMessages.ariza)
    await ctx.reply(SherikSceneMessages.name)
      ctx.scene.resume()
  })



Sherikscene.wait("get-age").on("message:text",async(ctx)=>{
    (ctx as any ).session.name=ctx.message.text
    await ctx.reply(SherikSceneMessages.age)
    ctx.scene.resume()
})

Sherikscene.wait("get-texnologiya").on("message:text",async(ctx)=>{
    (ctx as any ).session.age=ctx.message.text
    await ctx.reply(SherikSceneMessages.texnologiya)
    ctx.scene.resume()
})

Sherikscene.wait("get-aloqa").on("message:text", async (ctx) => {
    (ctx as any ).session.texnologiya = ctx.message.text;
        await ctx.reply(SherikSceneMessages.aloqa);
        ctx.scene.resume();
  });
  

  Sherikscene.wait("get-narx").on("message:text", async (ctx) => {
      if(uzbPhoneRegex.test(ctx.message.text) && ctx.message.text){
        (ctx as any ).session.aloqa = ctx.message.text;
        await ctx.reply(SherikSceneMessages.narx)
        ctx.scene.resume()
    }else{
        await ctx.reply(SherikSceneMessages.aloqa)
    }
  });

  Sherikscene.wait("get-hudud").on("message:text",async(ctx)=>{
    (ctx as any ).session.narx = ctx.message.text;
    await ctx.reply(SherikSceneMessages.hudud)
    ctx.scene.resume()
})

Sherikscene.wait("get-kasb").on("message:text",async(ctx)=>{
    if(viloyatlar.includes(ctx.message.text.toLowerCase())){
        (ctx as any ).session.hudud = ctx.message.text;
        await ctx.reply(SherikSceneMessages.kasb)
        ctx.scene.resume()
    }else{
        await ctx.reply(SherikSceneMessages.hudud)
    }
})

Sherikscene.wait("get-murojaat").on("message:text",async(ctx)=>{
    (ctx as any ).session.kasb = ctx.message.text;
    await ctx.reply(SherikSceneMessages.murojaat_vaqti)
    ctx.scene.resume()
})

Sherikscene.wait("get-maqsad").on("message:text",async(ctx)=>{
    (ctx as any ).session.murojaat_vaqti = ctx.message.text;
    await ctx.reply(SherikSceneMessages.maqsad)
    ctx.scene.resume()
})


Sherikscene.wait("get-template").on("message:text",async(ctx)=>{
    (ctx as any ).session.maqsad = ctx.message.text;
    (ctx as any ).session.tag=SherikSceneMessages.tag;
    (ctx as any ).session.theme=SherikSceneMessages.theme;
    (ctx as any ).session.user_id=ctx.message.from.id
    const format=await formatservice.createTemplate((ctx as any ).session)
    await ctx.reply(format,{
        reply_markup:UniversalKeyboard
    })

    ctx.scene.resume()
})

Sherikscene.wait("last-middleware").on("message:text",async(ctx)=>{
    const query=ctx.message.text.toLocaleLowerCase()
    
    if(query==SomeNeccessaryMessages.yes){
        await postservice.createPost((ctx as any ).session)
        await ctx.api.sendMessage(APPLICATION.admin_id,SomeNeccessaryMessages.notification)
        await ctx.reply(SomeNeccessaryMessages.messageGood)

    }else if(query==SomeNeccessaryMessages.no){
        ctx.reply(SomeNeccessaryMessages.messageBad)
    }

    ctx.scene.exit()
})
