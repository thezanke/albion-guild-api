import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { GuildModule } from './guild/guild.module';
import { GameApiModule } from './game-api/game-api.module';

@Module({
  imports: [GuildModule, GameApiModule],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {}
