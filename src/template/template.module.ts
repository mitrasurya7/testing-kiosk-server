import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [EventsModule], 
  providers: [TemplateService],
  controllers: [TemplateController]
})
export class TemplateModule {}
