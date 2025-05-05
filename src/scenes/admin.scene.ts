import {Scene} from "grammy-scenes"
import { AddType, BotContext, Hodim, Job, Sherik, Ustoz,  } from "../utils"
import { APPLICATION } from "../config";
import { AdminSceneMessages, ButtonMessages, SomeNeccessaryMessages } from "../messages";
import { Adminkeyboard, JobTypeKeyboards,  } from "../keyboards";
import {  FormatService, UniversalAdminFunction, createUniversalService} from "../helpers";
import { modelMap } from "../helpers/functions/AdminSceneFunctions/admin.scene.variables";


export const Adminscene = new Scene<BotContext>("admin");
const formatter = new FormatService();

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
  
  Adminscene.wait("give-add-by-types").on("callback_query:data", async (ctx) => {
    const query = ctx.callbackQuery.data.toLowerCase().trim();
    let model: any | undefined;
    let type: AddType | undefined;
  
    switch (query) {
      case ButtonMessages.ish:
        model = Job;
        type = AddType.ISH;
        break;
      case ButtonMessages.hodim:
        model = Hodim;
        type = AddType.HODIM;
        break;
      case ButtonMessages.ustoz:
        model = Ustoz;
        type = AddType.USTOZ;
        break;
      case ButtonMessages.sherik:
        model = Sherik;
        type = AddType.SHERIK;
        break;
    }
    
    if(query==SomeNeccessaryMessages.back){
      await ctx.reply(AdminSceneMessages.getMainMenu)
      return ctx.scene.exit()

    }
  
    if (model && type) {
      await UniversalAdminFunction(ctx, model, type);
    }
  
    ctx.scene.resume();
  });
  
  Adminscene.wait("send-to-channel-middleware").on("callback_query:data", async (ctx) => {
    const query = ctx.callbackQuery.data.toLowerCase().trim();
    const [id, modelType,type] = query.split("_");
  
    const model = modelMap[modelType];
    
  
    const universalService = createUniversalService(model);
    const post=await universalService.getByid(id)
    if (query.startsWith(SomeNeccessaryMessages.accept)) {
      await universalService.update(id);
      await ctx.api.sendMessage(id, SomeNeccessaryMessages.good);
      const format = await formatter.createTemplate(post, type.toUpperCase() as AddType);
      if(format){
        await ctx.api.sendMessage(APPLICATION.channel,format);
        await ctx.api.sendMessage(APPLICATION.admin_id, SomeNeccessaryMessages.good);
      }
    } else if (query.startsWith(SomeNeccessaryMessages.reject)) {
      await universalService.delete(id);
      await ctx.reply(SomeNeccessaryMessages.ignore);
    } else if (query.startsWith(SomeNeccessaryMessages.back)) {
      await ctx.reply(AdminSceneMessages.getMainMenu);
      return ctx.scene.exit();
    }
  });




