import { Body, Controller, Post } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Auth } from '../common/auth.decorator';
import { WebResponse } from '../model/web.model';
import {
  CreateTemplateRequest,
  TemplateResponse,
} from '../model/template.model';
import { User } from '@prisma/client';

@Controller('/api/templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post()
  async create(
    @Auth() user: User,
    @Body() createTemplateRequest: CreateTemplateRequest,
  ): Promise<WebResponse<TemplateResponse>> {
    const template = await this.templateService.create(createTemplateRequest);

    return {
      data: template,
    };
  }
}
