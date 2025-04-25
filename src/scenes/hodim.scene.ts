import {Scene} from "grammy-scenes"
import { BotContext, uzbPhoneRegex, viloyatlar } from "../utils"
import { FormatService, PostService } from "../helpers"
import { HodimSceneMessages, SomeNeccessaryMessages } from "../messages"
import { UniversalKeyboard } from "../keyboards"
import { APPLICATION } from "../config"



export const HodimScene=new Scene<BotContext>("hodim")


const formatservice=new FormatService()
const postservice=new PostService()

HodimScene.step(async(ctx)=>{
  await ctx.reply(HodimSceneMessages.ariza)
  await ctx.reply(HodimSceneMessages.name)
    ctx.scene.resume()
})

HodimScene.wait("get-age").on("message:text",async(ctx)=>{
    (ctx as any ).session.name=ctx.message.text
    await ctx.reply(HodimSceneMessages.age)
    ctx.scene.resume()
})

HodimScene.wait("get-texnologiya").on("message:text",async(ctx)=>{
    (ctx as any ).session.age=ctx.message.text
    await ctx.reply(HodimSceneMessages.texnologiya)
    ctx.scene.resume()
})

HodimScene.wait("get-aloqa").on("message:text", async (ctx) => {
    (ctx as any ).session.texnologiya = ctx.message.text;
        await ctx.reply(HodimSceneMessages.aloqa);
        ctx.scene.resume();
  });
  

HodimScene.wait("get-narx").on("message:text", async (ctx) => {
      if(uzbPhoneRegex.test(ctx.message.text) && ctx.message.text){
        (ctx as any ).session.aloqa = ctx.message.text;
        await ctx.reply(HodimSceneMessages.narx)
        ctx.scene.resume()
    }else{
        await ctx.reply(HodimSceneMessages.aloqa)
    }
  });

HodimScene.wait("get-hudud").on("message:text",async(ctx)=>{
    (ctx as any ).session.narx = ctx.message.text;
    await ctx.reply(HodimSceneMessages.hudud)
    ctx.scene.resume()
})
HodimScene.wait("get-kasb").on("message:text",async(ctx)=>{
    if(viloyatlar.includes(ctx.message.text.toLowerCase())){
        (ctx as any ).session.hudud = ctx.message.text;
        await ctx.reply(HodimSceneMessages.kasb)
        ctx.scene.resume()
    }else{
        await ctx.reply(HodimSceneMessages.hudud)
    }
})

HodimScene.wait("get-murojaat").on("message:text",async(ctx)=>{
    (ctx as any ).session.kasb = ctx.message.text;
    await ctx.reply(HodimSceneMessages.murojaat_vaqti)
    ctx.scene.resume()
})

HodimScene.wait("get-maqsad").on("message:text",async(ctx)=>{
    (ctx as any ).session.murojaat_vaqti = ctx.message.text;
    await ctx.reply(HodimSceneMessages.maqsad)
    ctx.scene.resume()
})


HodimScene.wait("get-template").on("message:text",async(ctx)=>{
    (ctx as any ).session.maqsad = ctx.message.text;
    (ctx as any ).session.tag=HodimSceneMessages.tag;
    (ctx as any ).session.theme=HodimSceneMessages.theme;
    (ctx as any ).session.user_id=ctx.message.from.id
    const format=await formatservice.createTemplate((ctx as any ).session)
    await ctx.reply(format,{
        reply_markup:UniversalKeyboard
    })

    ctx.scene.resume()
})

HodimScene.wait("last-middleware").on("message:text",async(ctx)=>{
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
