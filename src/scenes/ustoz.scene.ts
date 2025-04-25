import {Scene} from "grammy-scenes"
import { BotContext, uzbPhoneRegex, viloyatlar } from "../utils"
import { FormatService, PostService } from "../helpers"
import { SomeNeccessaryMessages, UstozSceneMessages } from "../messages"
import { APPLICATION } from "../config"
import { UniversalKeyboard } from "../keyboards"


export const Ustozscene=new Scene<BotContext>("ustoz")



const formatservice=new FormatService()
const postservice=new PostService()


Ustozscene.step(async(ctx)=>{
    await ctx.reply(UstozSceneMessages.ariza)
    await ctx.reply(UstozSceneMessages.name)
      ctx.scene.resume()
  })



  Ustozscene.wait("get-age").on("message:text",async(ctx)=>{
    (ctx as any ).session.name=ctx.message.text
    await ctx.reply(UstozSceneMessages.age)
    ctx.scene.resume()
})

Ustozscene.wait("get-texnologiya").on("message:text",async(ctx)=>{
    (ctx as any ).session.age=ctx.message.text
    await ctx.reply(UstozSceneMessages.texnologiya)
    ctx.scene.resume()
})

Ustozscene.wait("get-aloqa").on("message:text", async (ctx) => {
    (ctx as any ).session.texnologiya = ctx.message.text;
        await ctx.reply(UstozSceneMessages.aloqa);
        ctx.scene.resume();
  });
  

  Ustozscene.wait("get-narx").on("message:text", async (ctx) => {
      if(uzbPhoneRegex.test(ctx.message.text) && ctx.message.text){
        (ctx as any ).session.aloqa = ctx.message.text;
        await ctx.reply(UstozSceneMessages.narx)
        ctx.scene.resume()
    }else{
        await ctx.reply(UstozSceneMessages.aloqa)
    }
  });

  Ustozscene.wait("get-hudud").on("message:text",async(ctx)=>{
    (ctx as any ).session.narx = ctx.message.text;
    await ctx.reply(UstozSceneMessages.hudud)
    ctx.scene.resume()
})

Ustozscene.wait("get-kasb").on("message:text",async(ctx)=>{
    if(viloyatlar.includes(ctx.message.text.toLowerCase())){
        (ctx as any ).session.hudud = ctx.message.text;
        await ctx.reply(UstozSceneMessages.kasb)
        ctx.scene.resume()
    }else{
        await ctx.reply(UstozSceneMessages.hudud)
    }
})

Ustozscene.wait("get-murojaat").on("message:text",async(ctx)=>{
    (ctx as any ).session.kasb = ctx.message.text;
    await ctx.reply(UstozSceneMessages.murojaat_vaqti)
    ctx.scene.resume()
})

Ustozscene.wait("get-maqsad").on("message:text",async(ctx)=>{
    (ctx as any ).session.murojaat_vaqti = ctx.message.text;
    await ctx.reply(UstozSceneMessages.maqsad)
    ctx.scene.resume()
})


Ustozscene.wait("get-template").on("message:text",async(ctx)=>{
    (ctx as any ).session.maqsad = ctx.message.text;
    (ctx as any ).session.tag=UstozSceneMessages.tag;
    (ctx as any ).session.theme=UstozSceneMessages.theme;
    (ctx as any ).session.user_id=ctx.message.from.id
    const format=await formatservice.createTemplate((ctx as any ).session)
    await ctx.reply(format,{
        reply_markup:UniversalKeyboard
    })

    ctx.scene.resume()
})

Ustozscene.wait("last-middleware").on("message:text",async(ctx)=>{
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
