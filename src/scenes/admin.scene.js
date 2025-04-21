import { Scene } from 'grammy-scenes'
import { AdminSceneMessages } from '../messages/index.js'
import { APPLICATION } from '../config/index.js'
import { Adminkeyboard } from '../keyboards/index.js'
import { getPosts } from '../helpers/functions/index.js'


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
            const posts=await getPosts()
            if(posts.length===0){
             await ctx.answerCallbackQuery(AdminSceneMessages.Noposts)   
            }

            for(const post of posts){
                await ctx.reply(`@${post.user_id}\n${post.name}\n${post.age}\n${post.texnologiya}\n${post.aloqa}\n${post.hudud}\n${post.narx}\n${post.maqsad}\n${post.murojaat_vaqti}`)
            }

        }
})
