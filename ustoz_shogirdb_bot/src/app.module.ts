import { Module } from '@nestjs/common';

import { NestjsGrammyModule } from '@grammyjs/nestjs';
import { BotModule } from './bot/bot.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    BotModule,
    NotifyModule
  ],

})
export class AppModule {}
