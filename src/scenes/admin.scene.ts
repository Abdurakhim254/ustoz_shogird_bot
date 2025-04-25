import {Scene} from "grammy-scenes"
import { BotContext, NeededCount } from "../utils";
import { APPLICATION } from "../config";
import { AdminSceneMessages, SomeNeccessaryMessages } from "../messages";
import { Adminkeyboard, giveAddKeyboard } from "../keyboards";
import { FormatService, PostService } from "../helpers";


export const Adminscene = new Scene<BotContext>("admin");

const postservice=new PostService()
const formatservice=new FormatService()

Adminscene.step(async(ctx)=>{

    const id = (ctx as any).from.id;

    if(id!=APPLICATION.admin_id){
        await ctx.reply(AdminSceneMessages.forbidden)
        return ctx.scene.exit()
    }

    await ctx.reply(AdminSceneMessages.Panel,{
        reply_markup:Adminkeyboard
    })
    ctx.scene.resume()
})


Adminscene.wait("start").on("callback_query:data", async (ctx) => {
    const query = ctx.callbackQuery.data.toLowerCase().trim();
  
    if (query === SomeNeccessaryMessages.notify) {
      const posts = await postservice.getPosts(NeededCount.ALL);
      
      if (!Array.isArray(posts) || posts.length === 0) {
        await ctx.api.sendMessage(APPLICATION.admin_id, AdminSceneMessages.noPosts);
        return ctx.scene.exit();
      }
  
      for (const post of posts) {
        const format = await formatservice.createTemplate(post);
        await ctx.api.sendMessage(APPLICATION.admin_id, format, {
          reply_markup: giveAddKeyboard(post.user_id),
        });
      }
  
    } else if (query === SomeNeccessaryMessages.back) {
      await ctx.reply(AdminSceneMessages.getMainMenu);
      return ctx.scene.exit();
    }
  
    ctx.scene.resume();
  });
  


Adminscene.wait("give-add-ingore-add").on("callback_query:data",async(ctx)=>{
    const query = ctx.callbackQuery.data.toLowerCase().trim();
    const id=query.split("_")[1]

    if(query.startsWith(SomeNeccessaryMessages.accept)){
        await postservice.updatePost(+id)
        const post=await postservice.getPosts(NeededCount.ONE,+id)
        const format=await formatservice.createTemplate(post)
        await ctx.api.sendMessage(id,SomeNeccessaryMessages.good)
        await ctx.api.sendMessage(APPLICATION.channel,format)
    }else if(query.startsWith(SomeNeccessaryMessages.reject)){
        await postservice.deletePost(+id)
        await ctx.api.sendMessage(id,SomeNeccessaryMessages.bad)
    }else if(query==SomeNeccessaryMessages.back){
        await ctx.reply(AdminSceneMessages.getMainMenu)
        return ctx.scene.exit()
    }
})

