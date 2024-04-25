import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  namespace: 'events',
})
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(deviceId: string, ...args: any[]) {
    console.log('Device connected');
  }

  handleDisconnect(deviceId: string) {
    console.log('Device disconnected', deviceId);
  }

  sendMessage(device: any) {
    if (!device) {
      this.server.emit('device', 'Device not found');
      console.log('Device not found');
      this.handleDisconnect(device.id);
      return;
    }

    this.server.emit('device', device);
  }
}
