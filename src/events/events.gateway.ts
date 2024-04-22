import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { DeviceService } from 'src/device/device.service';

@Injectable()
@WebSocketGateway({
  namespace: 'events',
})
export class EventsGateway implements OnGatewayConnection {
  constructor(private deviceService: DeviceService) {}
  @WebSocketServer() server: Server;

  handleConnection(deviceId: string, ...args: any[]) {
    console.log('Device connected', deviceId);
  }

  async handleDisconnect(deviceId: string) {
    console.log('Device disconnected', deviceId); 
  }

  async sendMessage(deviceId: string) {
    if (!deviceId) {
      console.log('No device ID provided');
      this.handleDisconnect(deviceId);
      return;
    }

    const device = await this.deviceService.getDeviceById(deviceId);

    if (!device) {
      this.server.emit('device', 'Device not found');
      console.log('Device not found');
      this.handleDisconnect(deviceId);
      return;
    }
    
    this.server.emit('device', device);
  }
}
