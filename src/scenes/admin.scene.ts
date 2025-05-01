import {Scene} from "grammy-scenes"
import { BotContext, NeededCount } from "../utils";
import { APPLICATION } from "../config";
import { AdminSceneMessages, ButtonMessages, SomeNeccessaryMessages } from "../messages";
import { Adminkeyboard, JobTypeKeyboards, giveAddKeyboard } from "../keyboards";
import { FormatService, PostService, messageDeleter } from "../helpers";


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
        await ctx.reply(AdminSceneMessages.addtypes,{
          reply_markup:JobTypeKeyboards
        })
      }
      
      ctx.scene.resume();
  });
  


Adminscene.wait("give-add-by-types").on("callback_query:data",async(ctx)=>{
    const query=ctx.callbackQuery.data.toLowerCase().trim()
    if(query==ButtonMessages.ish){

    }else if(query==ButtonMessages.hodim){

    }else if(query==ButtonMessages.ustoz){

    }else if(query==ButtonMessages.sherik){

    }

    ctx.scene.resume()
})


Adminscene.wait("last-middleware").on("callback_query:data",async(ctx)=>{
  
})




