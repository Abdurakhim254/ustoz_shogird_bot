import { Scene } from 'grammy-scenes'


export const HodimScene=new Scene("hodim")

HodimScene.step(async(ctx)=>{
    await ctx.reply("hodim")
})