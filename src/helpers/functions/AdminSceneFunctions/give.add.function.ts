import { Context } from "grammy";
import { Model, Document } from "mongoose";
import { createUniversalService } from "./create.universal.service";
import { AdminSceneMessages } from "../../../messages";
import { JobTypeKeyboards, giveAddKeyboard } from "../../../keyboards";
import { FormatService } from "../../service";
import { AddType } from "../../../utils";

export const UniversalAdminFunction = async <T extends Document>(ctx: Context, model: Model<T>,type:AddType) => {
    const universalService = createUniversalService(model);
    const posts =await universalService.getAll()
    if(!posts){
        await ctx.reply(AdminSceneMessages.noPosts,{
            reply_markup:JobTypeKeyboards
        })
        return
    }

    const formatter = new FormatService();


    for (const post of posts) {
        const format = await formatter.createTemplate(post, type);
        if (format) {
          await ctx.reply(format, {
            reply_markup: giveAddKeyboard(post.id,model,type),
          });
        }
      }
      

  };
