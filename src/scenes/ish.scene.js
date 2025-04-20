import { Scene } from 'grammy-scenes'
import { IShObj } from '../messages/index.js'

export const Ishscene=new Scene("Ish")

Ishscene.step(async(ctx)=>{
    await ctx.reply(IShObj.theme)
    await ctx.reply(IShObj.ariza)
   
})

Ishscene.wait("start").on("message:text",async(ctx)=>{
    await ctx.reply(IShObj.name)
})


Ishscene.wait("get-name-and-familya").on("message:text",async(ctx)=>{
    ctx.session.name=ctx.message.text
    await ctx.reply(IShObj.age)
})

Ishscene.wait("get-age").on("message:text",async(ctx)=>{
    ctx.session.age=ctx.message.text
    await ctx.reply(IShObj.texnologiya)
})

Ishscene.wait("aloqa").on("message:text",async(ctx)=>{
    ctx.session.age=ctx.message.text
    await ctx.reply(IShObj.aloqa)
})



Ishscene.wait("hudud").on("message:text",async(ctx)=>{
    ctx.session.aloqa=ctx.message.text
    await ctx.reply(IShObj.hudud)
})



Ishscene.wait("narx").on("message:text",async(ctx)=>{
    ctx.session.hudud=ctx.message.text
    await ctx.reply(IShObj.narx)
})


Ishscene.wait("kasb").on("message:text",async(ctx)=>{
    ctx.session.narx=ctx.message.text
    await ctx.reply(IShObj.kasb)
})


Ishscene.wait("vaqt").on("message:text",async(ctx)=>{
    ctx.session.kasb=ctx.message.text
    await ctx.reply(IShObj.muroojaat_vaqti)
})


Ishscene.wait("maqsad").on("message:text",async(ctx)=>{
    ctx.session.vaqt=ctx.message.text
    await ctx.reply(IShObj.maqsad)
})


Ishscene.wait("test").on("message:text",async(ctx)=>{
    ctx.session.maqsad=ctx.message.text
    await ctx.reply(ctx.session)
})






