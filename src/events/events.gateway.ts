import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  namespace: 'events',
})
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected'); // Optional: untuk melihat apakah koneksi berhasil
  }

  sendMessage(message: string) {
    this.server.emit('coba', message);
  }
}
