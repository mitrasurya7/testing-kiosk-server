import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { Auth } from '../common/auth.decorator';
import { WebResponse } from '../model/web.model';
import {
  CreateTemplateRequest,
  TemplateResponse,
  UpdateTemplateRequest,
} from '../model/template.model';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file,
    @Auth() user: User,
    @Body() createTemplateRequest: CreateTemplateRequest,
  ): Promise<WebResponse<TemplateResponse>> {
    if (!file) {
      throw new Error('File not found');
    }

    const template = await this.templateService.create(
      createTemplateRequest,
      file,
    );

    return {
      data: template,
    };
  }

  @Put('/:id')
  async update(
    @Auth() user: User,
    @Body() updateTemplateRequest: UpdateTemplateRequest,
    @Param('id') id: number,
  ): Promise<WebResponse<TemplateResponse>> {
    const template = await this.templateService.updateTemplate(
      id,
      updateTemplateRequest,
    );
    return {
      data: template,
    };
  }

  @Get()
  async getAll(@Auth() user: User): Promise<WebResponse<TemplateResponse[]>> {
    const templates = await this.templateService.findAll();
    return {
      data: templates,
    };
  }

  @Get('/:id')
  async getById(
    @Auth() user: User,
    @Param('id') id: number,
  ): Promise<WebResponse<TemplateResponse>> {
    const template = await this.templateService.findById(id);
    return {
      data: template,
    };
  }
}
