import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { LayoutService } from 'src/layout/layout.service';

@Injectable()
@WebSocketGateway({
  namespace: 'events',
})
export class EventsGateway implements OnGatewayConnection {
  constructor(private layoutService: LayoutService) {}
  @WebSocketServer() server: Server;

  handleConnection(deviceId: string, ...args: any[]) {
    console.log('Device connected');
  }

  handleDisconnect() {
    console.log('Device disconnected');
  }

  async sendMessage(layoutId: number) {
    if (!layoutId) {
      this.server.emit('device', 'Device not found');
      console.log('Device not found');
      this.handleDisconnect();
      return;
    }

    const layout = await this.layoutService.getLayoutById(layoutId);

    if (layout) {
      this.server.emit('device', layout);
    }

    this.handleDisconnect();
  }
}
