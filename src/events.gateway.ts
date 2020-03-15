import { WebSocketGateway, ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { GuildService } from './guild/guild.service';
import { ReferenceService } from './reference/reference.service';

@WebSocketGateway()
export class EventsGateway {
  constructor(private readonly guildService: GuildService, private readonly referenceService: ReferenceService) {}

  // NOTE: SADLY WONT WORK THIS WAY WITH NESTED CONTAINERS. ON THE CLIENT SIDE THEY WONT
  // HAVE THEIR SOCKET LISTENERS BOUND IN TIME. WE WILL REVISIT LATER WHEN GLOBAL DATA STORE EXISTS.
  // handleConnection(@ConnectedSocket() client: Socket) {
  //   this.guildService.emitData(client);
  //   this.referenceService.emitData(client);
  // }

  @SubscribeMessage('request:referenceData')
  referenceDataHandler(@ConnectedSocket() client: Socket) {
    this.referenceService.emitData(client);
  }

  @SubscribeMessage('request:guildData')
  guildDataHandler(@ConnectedSocket() client: Socket) {
    this.guildService.emitData(client);
  }
}
