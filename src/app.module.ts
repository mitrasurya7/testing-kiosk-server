import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { TemplateModule } from './template/template.module';
import { LocationModule } from './location/location.module';
import { DeviceModule } from './device/device.module';
import { ContentModule } from './content/content.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [CommonModule, UserModule, TemplateModule, LocationModule, DeviceModule, ContentModule, FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
