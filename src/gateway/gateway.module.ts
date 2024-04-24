import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { DeviceModule } from 'src/device/device.module';
@Module({
    imports: [
        DeviceModule
    ],
    providers: [Gateway],
})
export class GatewayModule {}