import {Scene} from "grammy-scenes"
import { AddType, BotContext, Hodim, Job, Sherik, Ustoz,  } from "../utils"
import { APPLICATION } from "../config";
import { AdminSceneMessages, ButtonMessages, SomeNeccessaryMessages } from "../messages";
import { Adminkeyboard, JobTypeKeyboards, giveAddKeyboard,  } from "../keyboards";
import { FormatService, createUniversalService, modelMap } from "../helpers";

export const Adminscene = new Scene<BotContext>("admin");

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
      }else if(query==SomeNeccessaryMessages.back){
        await ctx.reply(AdminSceneMessages.getMainMenu)
        return ctx.scene.exit()
      }
      
      ctx.scene.resume();
  });
  
  
Adminscene.wait("get-add-by-type").on("callback_query:data",async(ctx)=>{
  const query = ctx.callbackQuery.data.toLowerCase().trim();
  if(query==SomeNeccessaryMessages.back){
    await ctx.reply(AdminSceneMessages.getMainMenu)
    return ctx.scene.exit()
  }    

  const queryarr=[ButtonMessages.ish,ButtonMessages.hodim,ButtonMessages.sherik,ButtonMessages.ustoz]
  

  if(queryarr.includes(query)){
  
  const universalService=createUniversalService(modelMap[query])
  console.log(query);
  
  console.log(modelMap[query]);
  
  const posts=await universalService.getAll()
  if(query==ButtonMessages.ish){
    if(!posts.length){
      await ctx.reply(AdminSceneMessages.noPosts,{
        reply_markup:JobTypeKeyboards
      })
    }else{
      for(const post of posts){
        let format=await formatservice.createTemplate(post,query.toUpperCase() as AddType)
        if(format){
          await ctx.reply(format,{
            reply_markup:giveAddKeyboard(post.id,modelMap[query])
          })
        }
      }
    }
  }else if(query==ButtonMessages.hodim){
    if(!posts.length){
      await ctx.reply(AdminSceneMessages.noPosts,{
        reply_markup:JobTypeKeyboards
      })
    }else{
      for(const post of posts){
        let format=await formatservice.createTemplate(post,query.toUpperCase() as AddType)
        if(format){
          await ctx.reply(format,{
            reply_markup:giveAddKeyboard(post.id,modelMap[query])
          })
        }
      }
    }

  }else if(query==ButtonMessages.sherik){
    if(!posts.length){
      await ctx.reply(AdminSceneMessages.noPosts,{
        reply_markup:JobTypeKeyboards
      })
    }else{
      for(const post of posts){
        let format=await formatservice.createTemplate(post,query.toUpperCase() as AddType)
        if(format){
          await ctx.reply(format,{
            reply_markup:giveAddKeyboard(post.id,modelMap[query])
          })
        }
      }
    }
  }else{
    if(!posts.length){
      await ctx.reply(AdminSceneMessages.noPosts,{
        reply_markup:JobTypeKeyboards
      })
    }else{
      for(const post of posts){
        let format=await formatservice.createTemplate(post,query.toUpperCase() as AddType)
        if(format){
          await ctx.reply(format,{
            reply_markup:giveAddKeyboard(post.id,modelMap[query])
          })
        }
      }
    }

  }

  }

  ctx.scene.resume()

})

Adminscene.wait("last-middleware").on("callback_query:data", async (ctx) => {
  const [action, id, modelName, type] = ctx.callbackQuery.data.toLowerCase().trim().split("_");

  const model = modelMap[modelName];
  const universalService = createUniversalService(model);

  if (action === SomeNeccessaryMessages.accept) {
    const post = await universalService.getByid(id);
    await universalService.update(id);
    const format = await formatservice.createTemplate(post, type.toUpperCase() as AddType);
    if (format) {
      await ctx.api.sendMessage(APPLICATION.channel, format);
      await ctx.api.sendMessage(APPLICATION.admin_id, SomeNeccessaryMessages.good);
    }
  } else if (action === SomeNeccessaryMessages.reject) {
    await universalService.delete(id);
    await ctx.reply(SomeNeccessaryMessages.ignore);
  } else if (action === SomeNeccessaryMessages.back) {
    await ctx.reply(AdminSceneMessages.getMainMenu);
    return ctx.scene.exit();
  }

  ctx.scene.resume();
});
