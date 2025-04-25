import {Scene} from "grammy-scenes"
import { BotContext, uzbPhoneRegex, viloyatlar } from "../utils";
import { IShSceneMessages, SomeNeccessaryMessages } from "../messages";
import { FormatService, PostService } from "../helpers";
import { UniversalKeyboard } from "../keyboards";
import { APPLICATION } from "../config";



export const Ishscene = new Scene<BotContext>("Ish");

const formatservice=new FormatService()
const postservice=new PostService()

Ishscene.step(async(ctx)=>{
  await ctx.reply(IShSceneMessages.ariza)
  await ctx.reply(IShSceneMessages.name)
    ctx.scene.resume()
})

Ishscene.wait("get-age").on("message:text",async(ctx)=>{
    (ctx as any ).session.name=ctx.message.text
    await ctx.reply(IShSceneMessages.age)
    ctx.scene.resume()
})

Ishscene.wait("get-texnologiya").on("message:text",async(ctx)=>{
    (ctx as any ).session.age=ctx.message.text
    await ctx.reply(IShSceneMessages.texnologiya)
    ctx.scene.resume()
})

Ishscene.wait("get-aloqa").on("message:text", async (ctx) => {
    (ctx as any ).session.texnologiya = ctx.message.text;
        await ctx.reply(IShSceneMessages.aloqa);
        ctx.scene.resume();
  });
  

  Ishscene.wait("get-narx").on("message:text", async (ctx) => {
      if(uzbPhoneRegex.test(ctx.message.text) && ctx.message.text){
        (ctx as any ).session.aloqa = ctx.message.text;
        await ctx.reply(IShSceneMessages.narx)
        ctx.scene.resume()
    }else{
        await ctx.reply(IShSceneMessages.aloqa)
    }
  });

Ishscene.wait("get-hudud").on("message:text",async(ctx)=>{
    (ctx as any ).session.narx = ctx.message.text;
    await ctx.reply(IShSceneMessages.hudud)
    ctx.scene.resume()
})

Ishscene.wait("get-kasb").on("message:text",async(ctx)=>{
    if(viloyatlar.includes(ctx.message.text.toLowerCase())){
        (ctx as any ).session.hudud = ctx.message.text;
        await ctx.reply(IShSceneMessages.kasb)
        ctx.scene.resume()
    }else{
        await ctx.reply(IShSceneMessages.hudud)
    }
})

Ishscene.wait("get-murojaat").on("message:text",async(ctx)=>{
    (ctx as any ).session.kasb = ctx.message.text;
    await ctx.reply(IShSceneMessages.murojaat_vaqti)
    ctx.scene.resume()
})

Ishscene.wait("get-maqsad").on("message:text",async(ctx)=>{
    (ctx as any ).session.murojaat_vaqti = ctx.message.text;
    await ctx.reply(IShSceneMessages.maqsad)
    ctx.scene.resume()
})


Ishscene.wait("get-template").on("message:text",async(ctx)=>{
    (ctx as any ).session.maqsad = ctx.message.text;
    (ctx as any ).session.tag=IShSceneMessages.tag;
    (ctx as any ).session.theme=IShSceneMessages.theme;
    (ctx as any ).session.user_id=ctx.message.from.id
    const format=await formatservice.createTemplate((ctx as any ).session)
    await ctx.reply(format,{
        reply_markup:UniversalKeyboard
    })

    ctx.scene.resume()
})

Ishscene.wait("last-middleware").on("message:text",async(ctx)=>{
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
