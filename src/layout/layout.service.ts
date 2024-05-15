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
import { ContentService } from 'src/content/content.service';
import { ContentResponse } from 'src/model/content.model';

@Injectable()
export class LayoutService {
  private contents: ContentResponse[];

  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private validationService: ValidationService,
    private contentService: ContentService,
  ) {}

  private async getContents(): Promise<any[]> {
    if (!this.contents) {
      this.contents = await this.contentService.findAll();
    }
    return this.contents;
  }

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

    const contents = await this.getContents();
    const selectedContents = contents.filter((content) =>
      result.contentIds.includes(content.id),
    );

    return { ...result, contents: selectedContents };
  }

  async GetAllLayouts(): Promise<LayoutResponse[]> {
    const layouts = await this.prismaService.layout.findMany();
    const contents = await this.getContents();
    return layouts.map((layout) => {
      const selectedContents = contents.filter((content) =>
        layout.contentIds.includes(content.id),
      );

      return { ...layout, contents: selectedContents };
    });
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

    const contents = await this.getContents();
    const selectedContents = contents.filter((content) =>
      layout.contentIds.includes(content.id),
    );

    return { ...layout, contents: selectedContents };
  }

  async getLayoutById(id: number): Promise<LayoutResponse> {
    const layout = await this.prismaService.layout.findUnique({
      where: { id: Number(id) },
      include: {
        Template: true,
        Device: true,
      },
    });
    const contents = await this.getContents();
    const selectedContents = contents.filter((content) =>
      layout.contentIds.includes(content.id),
    );

    return { ...layout, contents: selectedContents };
  }

  async getLayoutsByDeviceId(deviceId: string): Promise<LayoutResponse[]> {
    const layouts = await this.prismaService.layout.findMany({
      where: { deviceId },
    });

    const contents = await this.getContents();
    return layouts.map((layout) => {
      const selectedContents = contents.filter((content) =>
        layout.contentIds.includes(content.id),
      );

      return { ...layout, contents: selectedContents };
    });
  }

  async deleteLayout(id: number): Promise<LayoutResponse> {
    const layout = await this.prismaService.layout.delete({
      where: {
        id,
      },
    });
    const contents = await this.getContents();
    const selectedContents = contents.filter((content) =>
      layout.contentIds.includes(content.id),
    );

    return { ...layout, contents: selectedContents };
  }
}
