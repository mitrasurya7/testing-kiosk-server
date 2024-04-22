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
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class TemplateService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private validationService: ValidationService,
    private eventsGateway: EventsGateway,
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
    updateTemplateRequest: UpdateTemplateRequest,
  ): Promise<TemplateResponse> {
    this.logger.debug(
      `Update template ${id} ${JSON.stringify(updateTemplateRequest)}`,
    );
    this.validationService.validate(
      TemplateValidate.Update,
      updateTemplateRequest,
    );
    const template = await this.prismaService.template.update({
      where: {
        id: Number(id),
      },
      data: {
        ...updateTemplateRequest,
      },
    });

    // Emit a Socket.IO event after the update
    if (template) {
      this.eventsGateway.sendMessage(`Template with id ${id} has been updated`);
    }

    return template;
  }

  async findAll(): Promise<TemplateResponse[]> {
    return this.prismaService.template.findMany();
  }

  async findById(id: number): Promise<TemplateResponse> {
    return this.prismaService.template.findUnique({ where: { id } });
  }
}
