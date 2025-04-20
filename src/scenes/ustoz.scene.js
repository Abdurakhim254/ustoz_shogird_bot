import { Scene } from 'grammy-scenes'


export const Ustozscene=new Scene("ustoz")

Ustozscene.step(async(ctx)=>{
    await ctx.reply("ustoz")
})