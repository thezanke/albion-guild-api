import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GameApiModule } from '../game-api/game-api.module';

@Module({
  imports: [GameApiModule],
  providers: [GuildService],
  exports: [GuildService]
})
export class GuildModule {}
