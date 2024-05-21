import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { LayoutModule } from 'src/layout/layout.module';

@Module({
  imports: [LayoutModule],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
