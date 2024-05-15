import { Module } from '@nestjs/common';
import { LayoutService } from './layout.service';
import { LayoutController } from './layout.controller';
import { ContentModule } from 'src/content/content.module';

@Module({
  imports: [ContentModule],
  providers: [LayoutService],
  controllers: [LayoutController],
  exports: [LayoutService],
})
export class LayoutModule {}
