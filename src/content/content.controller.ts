import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Auth } from 'src/common/auth.decorator';
import { ContentResponse, CreateContentRequest } from '../model/content.model';
import { ContentService } from './content.service';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/contents')
export class ContentController {
  constructor(private contentService: ContentService) {}
  @Post()
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

  @Get()
  async getAll(@Auth() user: User): Promise<WebResponse<ContentResponse[]>> {
    const contents = await this.contentService.findAll();
    return {
      data: contents,
    };
  }

  @Get('/:id')
  async getById(
    @Auth() user: User,
    @Param('id') id: number,
  ): Promise<WebResponse<ContentResponse>> {
    const content = await this.contentService.findById(id);
    return {
      data: content,
    };
  }
}
