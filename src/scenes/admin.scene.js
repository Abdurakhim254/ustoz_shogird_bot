import { Scene } from 'grammy-scenes'
import { AdminSceneMessages } from '../messages/index.js'
import { APPLICATION } from '../config/index.js'
import { Adminkeyboard } from '../keyboards/index.js'


export const Adminscene=new Scene("admin")

Adminscene.step(async(ctx)=>{
    if(APPLICATION.admin_id!=ctx.message.from.id){
        await ctx.reply(AdminSceneMessages.FORBIDDENMESSAGE)
        return ctx.scene.exit()
    }
    await ctx.reply(AdminSceneMessages.Panel,{
        reply_markup:Adminkeyboard
    })
    ctx.scene.resume()
})


Adminscene.wait("start").on("callback_query:data",async(ctx)=>{
        const text=ctx.callbackQuery.data.toLowerCase();
        if(text=="notify"){
            await ctx.reply(text)
        }
})
