import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { BotModule } from 'src/bot/bot.module';

@Module({
  providers: [NotifyService],
})
export class NotifyModule {}
