import { SubscribeMessage, WebSocketGateway, ConnectedSocket } from '@nestjs/websockets';
// import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { GuildService } from './guild/guild.service';

@WebSocketGateway()
export class EventsGateway {
  // private logger = new Logger('EventsGateway');

  constructor(private readonly guildService: GuildService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    const guildData = this.guildService.getData();
    client.emit('response:guildData', guildData);
  }
}
