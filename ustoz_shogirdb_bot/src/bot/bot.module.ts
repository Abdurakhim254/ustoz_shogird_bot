import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Botservice } from './bot.service';

@Module({
    imports:[
        TelegrafModule.forRoot({
            token:"7709859293:AAH2C5OvQU1Cb_h3uDi7x56EjIvNwwIVWx0"
        }),
    ],
    providers:[Botservice]
})
export class BotModule {}
