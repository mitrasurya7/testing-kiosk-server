import { HttpException, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { PrismaService } from '../common/prisma.service';
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
        await this.deviceService.updateDevice(deviceId, {
          status: true,
          last_online: new Date(),
        });
        const device = await this.deviceService.getDeviceById(deviceId);
        socket.emit('device', device);
        socket.on('disconnect', async () => {
          await this.deviceService.updateDevice(deviceId, {
            status: false,
            last_offline: new Date(),
          });
          console.log('disconnect');
        });
      } catch (error) {
        socket.disconnect();
        throw new HttpException('Unauthorized', 401);
      }
    });

    // Handle messages
    this.server.on('message', (data) => {
      console.log(data);
    });
  }

  // Your other WebSocket message handlers can go here
}
