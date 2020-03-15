import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { GuildModule } from './guild/guild.module';
import { GameApiModule } from './game-api/game-api.module';
import { ReferenceService } from './reference/reference.service';
import { ReferenceModule } from './reference/reference.module';

@Module({
  imports: [GuildModule, GameApiModule, ReferenceModule],
  providers: [EventsGateway, ReferenceService],
})
export class AppModule {}
