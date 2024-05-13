import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  CreateLayoutRequest,
  LayoutResponse,
  UpdateLayoutRequest,
} from 'src/model/layout.model';
import { Logger } from 'winston';
import { LayoutValidation } from './layout.validation';

@Injectable()
export class LayoutService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private validationService: ValidationService,
  ) {}

  async createLayout(
    createLayoutRequest: CreateLayoutRequest,
  ): Promise<LayoutResponse> {
    this.logger.debug(
      `Create Layout at ${JSON.stringify(createLayoutRequest)}`,
    );
    this.validationService.validate(
      LayoutValidation.Create,
      createLayoutRequest,
    );

    const result = await this.prismaService.layout.create({
      data: createLayoutRequest,
    });

    return result;
  }

  async GetAllLayouts(): Promise<LayoutResponse[]> {
    return await this.prismaService.layout.findMany();
  }

  async updateLayout(
    id: number,
    updateLayoutRequest: UpdateLayoutRequest,
  ): Promise<LayoutResponse> {
    this.validationService.validate(
      LayoutValidation.Update,
      updateLayoutRequest,
    );

    const layout = await this.prismaService.layout.update({
      where: { id },
      data: updateLayoutRequest,
    });

    // if (layout) {
    //   this.eventsGateway.sendMessage(layout);
    // }

    return layout;
  }

  async getLayoutById(id: number): Promise<LayoutResponse> {
    return await this.prismaService.layout.findUnique({
      where: { id: Number(id) },
      include: {
        Template: true,
        Device: true,
      },
    });
  }

  async deleteLayout(id: number): Promise<LayoutResponse> {
    return await this.prismaService.layout.delete({
      where: {
        id,
      },
    });
  }
}
