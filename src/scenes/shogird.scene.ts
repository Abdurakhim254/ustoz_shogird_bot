import {Scene} from "grammy-scenes"
import { BotContext, uzbPhoneRegex, viloyatlar } from "../utils"
import { ErrorMessages, ShogirdSceneMessages, SomeNeccessaryMessages } from "../messages"
import { FormatService, PostService, messageDeleter } from "../helpers"
import { UniversalKeyboard } from "../keyboards"
import { APPLICATION } from "../config"


export const Shogirdscene=new Scene<BotContext>("shogird")


const formatservice=new FormatService()
const postservice=new PostService()


Shogirdscene.step(async(ctx)=>{
    ctx.session.messageIds = [];
  (ctx as any).session.chatId = ctx.chat?.id;
    var message=await ctx.reply(ShogirdSceneMessages.ariza)
    ctx.session.messageIds.push(message.message_id);
    var message=await ctx.reply(ShogirdSceneMessages.name)
    ctx.session.messageIds.push(message.message_id);
      ctx.scene.resume()
  })



Shogirdscene.wait("get-age").on("message:text",async(ctx)=>{
    ctx.session.messageIds.push(ctx.msg?.message_id);

    (ctx as any ).session.name=ctx.message.text
    const message=await ctx.reply(ShogirdSceneMessages.age)
    ctx.session.messageIds.push(message.message_id)
    ctx.scene.resume()
})

Shogirdscene.wait("get-texnologiya").on("message:text",async(ctx)=>{
    ctx.session.messageIds.push(ctx.msg?.message_id);

    (ctx as any ).session.age=ctx.message.text
    const message=await ctx.reply(ShogirdSceneMessages.texnologiya)
    ctx.session.messageIds.push(message.message_id)

    ctx.scene.resume()
})

Shogirdscene.wait("get-aloqa").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);

    (ctx as any ).session.texnologiya = ctx.message.text;
    const message=  await ctx.reply(ShogirdSceneMessages.aloqa);
        ctx.session.messageIds.push(message.message_id)

        ctx.scene.resume();
  });
  

Shogirdscene.wait("get-narx").on("message:text", async (ctx) => {
    ctx.session.messageIds.push(ctx.msg?.message_id);

      if(uzbPhoneRegex.test(ctx.message.text) && ctx.message.text){
        (ctx as any ).session.aloqa = ctx.message.text;
        const message= await ctx.reply(ShogirdSceneMessages.narx)
        ctx.session.messageIds.push(message.message_id)

        ctx.scene.resume()
    }else{
        const message= await ctx.reply(ShogirdSceneMessages.aloqa)
        ctx.session.messageIds.push(message.message_id)

    }
  });

  Shogirdscene.wait("get-hudud").on("message:text",async(ctx)=>{
    ctx.session.messageIds.push(ctx.msg?.message_id);

    (ctx as any ).session.narx = ctx.message.text;
    const message= await ctx.reply(ShogirdSceneMessages.hudud)
    ctx.session.messageIds.push(message.message_id)

    ctx.scene.resume()
})

Shogirdscene.wait("get-kasb").on("message:text",async(ctx)=>{
    ctx.session.messageIds.push(ctx.msg?.message_id);

    if(viloyatlar.includes(ctx.message.text.toLowerCase())){
        (ctx as any ).session.hudud = ctx.message.text;
        const message= await ctx.reply(ShogirdSceneMessages.kasb)
        ctx.session.messageIds.push(message.message_id)

        ctx.scene.resume()
    }else{
        const message= await ctx.reply(ShogirdSceneMessages.hudud)
        ctx.session.messageIds.push(message.message_id)

    }
})

Shogirdscene.wait("get-murojaat").on("message:text",async(ctx)=>{
    ctx.session.messageIds.push(ctx.msg?.message_id);

    (ctx as any ).session.kasb = ctx.message.text;
    const message=await ctx.reply(ShogirdSceneMessages.murojaat_vaqti)
    ctx.session.messageIds.push(message.message_id)

    ctx.scene.resume()
})

Shogirdscene.wait("get-maqsad").on("message:text",async(ctx)=>{
    ctx.session.messageIds.push(ctx.msg?.message_id);

    (ctx as any ).session.murojaat_vaqti = ctx.message.text;
    const message=await ctx.reply(ShogirdSceneMessages.maqsad)
    ctx.session.messageIds.push(message.message_id)

    ctx.scene.resume()
})


Shogirdscene.wait("get-template").on("message:text",async(ctx)=>{
    ctx.session.messageIds.push(ctx.msg?.message_id);

    (ctx as any ).session.maqsad = ctx.message.text;
    (ctx as any ).session.tag=ShogirdSceneMessages.tag;
    (ctx as any ).session.theme=ShogirdSceneMessages.theme;
    (ctx as any ).session.user_id=ctx.message.from.id
    const format=await formatservice.createTemplate((ctx as any ).session)
    await ctx.reply(format,{
        reply_markup:UniversalKeyboard
    })

    ctx.scene.resume()
})

Shogirdscene.wait("last-middleware").on("message:text",async(ctx)=>{
    const query = ctx.message.text.toLocaleLowerCase();
    await messageDeleter(ctx);
  
    try {
      if (query === SomeNeccessaryMessages.yes) {
        await postservice.createPost((ctx as any).session);
        await ctx.api.sendMessage(APPLICATION.admin_id, SomeNeccessaryMessages.notification);
        await ctx.reply(SomeNeccessaryMessages.messageGood);
  
      } else if (query === SomeNeccessaryMessages.no) {
        await ctx.reply(SomeNeccessaryMessages.messageBad);
      }
    } catch (error) {
      const err = error as any;
      if (err.error_code === 403) {
        await ctx.reply(ErrorMessages.error);
      } else {
        await ctx.reply(ErrorMessages.error);
      }
    }
  
    ctx.scene.exit();
})
