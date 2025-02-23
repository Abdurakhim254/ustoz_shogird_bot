import { Context ,Markup,Telegraf} from 'telegraf';
import { Update, Ctx, Command,InjectBot} from 'nestjs-telegraf';
import { Injectable } from '@nestjs/common';



@Injectable()
@Update()
export class Botservice{
    constructor(@InjectBot() private readonly bot: Telegraf<Context>){}
    
    @Command('start')
    async onStart(@Ctx() ctx: Context) {    

        console.log(ctx.from);
        

        const keyboard=Markup.keyboard([
            "EDIT","DELETE"
        ]).resize()

        const inlinekeyboard=Markup.inlineKeyboard([
            Markup.button.callback(`EDIT`,'edit'),
            Markup.button.callback(`Delete`,'delete')
        ])


        ctx.reply('Assalomu alaykum',keyboard)


        this.bot.action('edit',ctx=>{
            ctx.reply('edit qilindi')
        })
        this.bot.action('delete',ctx=>{
            ctx.reply('delete qilindi')
        })

    
        this.bot.on("message",ctx=>{
            ctx.reply("Salom")
        })
    }

    


}