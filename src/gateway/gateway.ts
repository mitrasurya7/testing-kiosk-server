import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server } from 'socket.io';
import { DeviceService } from '../device/device.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Gateway implements OnModuleInit {
  constructor(private deviceService: DeviceService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      try {
        const deviceId = socket.handshake.query['deviceId'] as string;

        if (!deviceId) {
          console.log('No device ID provided');
          socket.disconnect();
          return;
        }

        console.log('User connected', deviceId);
        const device = await this.deviceService.getDeviceById(deviceId);

        if (!device) {
          socket.emit('device', 'Device not found');
          console.log('Device not found');
          socket.disconnect();
          return;
        }

        await this.deviceService.updateDevice(deviceId, {
          status: true,
          lastOnline: new Date(),
        });
        socket.emit('device', device);

        // Handle disconnection
        socket.on('disconnect', async () => {
          await this.deviceService.updateDevice(deviceId, {
            status: false,
            lastOffline: new Date(),
          });
          console.log('disconnect');
        });
      } catch (error) {
        console.error('Error fetching device:', error);
      }
    });

    // Handle messages
    this.server.on('message', (data) => {
      console.log(data);
    });
  }

  // Your other WebSocket message handlers can go here
}
