import { Context ,Markup,Telegraf} from 'telegraf';
import { Update, Ctx, Command,InjectBot} from 'nestjs-telegraf';
import { Injectable } from '@nestjs/common';

@Injectable()
@Update()
export class NotifyService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Command('notify')
  async notify(@Ctx() ctx: Context) {
    ctx.reply('Assalomu alaykum');
    this.bot
  }
}
