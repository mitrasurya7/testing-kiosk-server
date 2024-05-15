import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { DeviceModule } from 'src/device/device.module';
import { LayoutModule } from 'src/layout/layout.module';
@Module({
  imports: [DeviceModule, LayoutModule],
  providers: [Gateway],
})
export class GatewayModule {}
