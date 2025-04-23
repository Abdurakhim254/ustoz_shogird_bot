import { Scene } from 'grammy-scenes'
import { AdminSceneMessages } from '../messages/index.js'
import { APPLICATION } from '../config/index.js'
import { Adminkeyboard, backKeyboard, getKeyboard } from '../keyboards/index.js'
import { deletePost, formatPosts, getPosts, updatePost } from '../helpers/functions/index.js'


export const Adminscene=new Scene("admin")

const channel=APPLICATION.channel

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
                const Post=await formatPosts(post.user_id)
             await ctx.reply(Post,{
                reply_markup:getKeyboard(post.user_id)
             })   
            }

        }else if("back"){
            await ctx.reply(AdminSceneMessages.success)
            ctx.scene.exit()
        }

        ctx.scene.resume()
})


Adminscene.wait("button-actions").on("callback_query:data",async(ctx)=>{
    const data = ctx.callbackQuery.data.toLowerCase();
    const id=""
    
    

    if (data.startsWith("tasdiq_")) {
        id=data.split("_")[1];
        await updatePost(id);
        const post=await formatPosts(id)
        await ctx.api.sendMessage(channel,post)
    
      } else if (data.startsWith("bekor_")) {
        id=data.split("_")[1];

        await deletePost(id);
        await ctx.api.sendMessage(id,"Post bekor qilindi ❌");
        
    }
        await ctx.reply(AdminSceneMessages.back,{
            reply_markup:backKeyboard
        })
        ctx.scene.resume()
    })
    
Adminscene.wait("back").on("callback_query:data",async(ctx)=>{
    const data=ctx.callbackQuery.data.toLowerCase()
    if(data=="back"){
        await ctx.reply(AdminSceneMessages.success)
        ctx.scene.exit()
    }else{
        await ctx.reply(AdminSceneMessages.back)    
    }
})