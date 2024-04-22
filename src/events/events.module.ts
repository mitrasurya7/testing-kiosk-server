import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { DeviceService } from 'src/device/device.service';

@Module({
  providers: [EventsGateway, DeviceService],
  exports: [EventsGateway],
})
export class EventsModule {}
