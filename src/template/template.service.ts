import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  CreateTemplateRequest,
  TemplateResponse,
  UpdateTemplateRequest,
} from '../model/template.model';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.service';
import { TemplateValidate } from './template.validation';
import { EventsGateway } from 'src/events/events.gateway';
import { DeviceService } from 'src/device/device.service';

@Injectable()
export class TemplateService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private validationService: ValidationService,
    private eventsGateway: EventsGateway,
    private readonly deviceService: DeviceService,
  ) {}

  async create(
    createTemplateRequest: CreateTemplateRequest,
    file: Express.Multer.File,
  ): Promise<TemplateResponse> {
    this.logger.debug(
      `Create new template ${JSON.stringify(createTemplateRequest)}`,
    );
    this.validationService.validate(
      TemplateValidate.Create,
      createTemplateRequest,
    );

    if (!file) {
      throw new BadRequestException('File not found');
    }

    try {
      // Generate unique file name using UUID
      const ext = path.extname(file.originalname);
      const fileName = `${uuidv4()}${ext}`;

      // Define storage directory
      const storageDir = path.join(__dirname, '../../files');

      // Check if the storage directory exists, if not, create it
      if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
      }

      // Define the file path
      const filePath = path.join(storageDir, fileName);

      // Move the uploaded file to the storage directory
      fs.renameSync(file.path, filePath);

      // Save content data to the database
      const template = await this.prismaService.template.create({
        data: {
          ...createTemplateRequest,
          coverImage: `${process.env.BACKEND_URL}/api/files/${fileName}`,
        },
      });

      return template;
    } catch (error) {
      this.logger.error('Failed to create template: ' + error);
      throw new InternalServerErrorException('Failed to create template');
    }
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
      data: updateTemplateRequest,
      include: {
        devices: true,
      },
    });

    if (template.devices?.length) {
      await Promise.all(
        template.devices.map(async (el) => {
          const device = await this.deviceService.getDeviceById(el.id);
          this.eventsGateway.sendMessage(device);
        }),
      );
    }
    return template;
  }

  async findAll(): Promise<TemplateResponse[]> {
    return this.prismaService.template.findMany({
      include: { devices: true },
    });
  }

  async findById(id: number): Promise<TemplateResponse> {
    return this.prismaService.template.findUnique({
      where: { id: Number(id) },
      include: { devices: true },
    });
  }
}
