import { Scene } from 'grammy-scenes'


export const Sherikscene=new Scene("sherik")

Sherikscene.step(async(ctx)=>{
    await ctx.reply("sherik")
})