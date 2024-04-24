import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { EventsModule } from 'src/events/events.module';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports: [EventsModule, DeviceModule], 
  providers: [TemplateService],
  controllers: [TemplateController]
})
export class TemplateModule {}
