import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { DeviceService } from 'src/device/device.service';
@Module({
    providers: [Gateway, DeviceService],
})
export class GatewayModule {}