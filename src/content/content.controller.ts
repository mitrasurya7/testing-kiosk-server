import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Auth } from 'src/common/auth.decorator';
import { CreateContentRequest } from '../model/content.model';
import { ContentService } from './content.service';

@Controller('/api/contents')
export class ContentController {
  constructor(private contentService: ContentService) {}
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file,
    @Auth() user: User,
    @Body() createContentRequest: CreateContentRequest,
  ) {
    if (!file) {
      throw new Error('File not found');
    }
    const result = await this.contentService.CreateContent(
      createContentRequest,
      user.id,
      file,
    );

    return {
      data: result,
    };
  }
}
