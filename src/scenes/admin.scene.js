import { Scene } from 'grammy-scenes'
import dotenv from "dotenv"
import { FORBIDDENMESSAGE } from '../messages/index.js'
import { APPLICATION } from '../config/index.js'


export const Adminscene=new Scene("admin")

Adminscene.step(async(ctx)=>{
    if(APPLICATION.admin_id!=ctx.message.from.id){
        await ctx.reply(FORBIDDENMESSAGE)
        return ctx.scene.exit()
    }
    await ctx.reply("admin")
})