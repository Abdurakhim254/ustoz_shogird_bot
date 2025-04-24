import {Scene} from "grammy-scenes"
import { BotContext } from "../utils";
import { APPLICATION } from "../config";
import { AdminSceneMessages, SomeNeccessaryMessages } from "../messages";
import { Adminkeyboard } from "../keyboards";
import { PostService } from "../helpers";


export const Adminscene = new Scene<BotContext>("admin");

const postservice=new PostService()

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


Adminscene.wait("start").on("callback_query:data",async(ctx)=>{
    const query = ctx.callbackQuery.data.toLowerCase().trim();
    
    if(query==SomeNeccessaryMessages.notify){
        const posts=await postservice.getPosts()
        if(!posts.length){
            await ctx.api.sendMessage(APPLICATION.admin_id,AdminSceneMessages.noPosts)
            return ctx.scene.exit()
        }else{
            for(const post of posts){
                
            }
        }
    }else if(query==SomeNeccessaryMessages.back){
        await ctx.reply(AdminSceneMessages.getMainMenu)
        return ctx.scene.exit()
    }

    ctx.scene.resume()
})
