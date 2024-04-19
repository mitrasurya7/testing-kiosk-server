import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileFilter } from 'src/utils/file.filter';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
      fileFilter: FileFilter.videoFilter,
    }),
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
