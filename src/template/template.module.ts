import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { EventsModule } from 'src/events/events.module';
import { DeviceModule } from 'src/device/device.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileFilter } from 'src/utils/file.filter';

@Module({
  imports: [
    EventsModule,
    DeviceModule,
    MulterModule.register({
      dest: './files',
      fileFilter: FileFilter.imageFilter,
    }),
  ],
  providers: [TemplateService],
  controllers: [TemplateController],
})
export class TemplateModule {}
