import { WebSocketGateway, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { GuildService } from './guild/guild.service';
import { ReferenceService } from './reference/reference.service';

@WebSocketGateway()
export class EventsGateway {
  constructor(private readonly guildService: GuildService, private readonly referenceService: ReferenceService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    this.guildService.emitData(client);
  }
}
