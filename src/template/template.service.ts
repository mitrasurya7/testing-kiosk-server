import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  CreateTemplateRequest,
  TemplateResponse,
  UpdateTemplateRequest,
} from '../model/template.model';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.service';
import { TemplateValidate } from './template.validation';

@Injectable()
export class TemplateService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private validationService: ValidationService,
  ) {}

  async create(
    createTemplateRequest: CreateTemplateRequest,
  ): Promise<TemplateResponse> {
    this.logger.debug(
      `Create new template ${JSON.stringify(createTemplateRequest)}`,
    );
    this.validationService.validate(
      TemplateValidate.Create,
      createTemplateRequest,
    );

    const template = await this.prismaService.template.create({
      data: createTemplateRequest,
    });
    return template;
  }

  async updateTemplate(
    id: number,
    UpdateTemplateRequest: UpdateTemplateRequest,
  ) {
    this.logger.debug(
      `Update template ${id} ${JSON.stringify(UpdateTemplateRequest)}`,
    );
    this.validationService.validate(
      TemplateValidate.Update,
      UpdateTemplateRequest,
    );
    const template = await this.prismaService.template.update({
      where: {
        id: Number(id),
      },
      data: {
        ...UpdateTemplateRequest,
      },
    });

    return template;
  }

  async findAll(): Promise<TemplateResponse[]> {
    return this.prismaService.template.findMany();
  }

  async findById(id: number): Promise<TemplateResponse> {
    return this.prismaService.template.findUnique({ where: { id } });
  }
}
