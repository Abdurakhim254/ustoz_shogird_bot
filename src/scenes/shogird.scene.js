import { Scene } from 'grammy-scenes'


export const Shogirdscene=new Scene("shogird")


Shogirdscene.step(async(ctx)=>{
    await ctx.reply("shogird")
})