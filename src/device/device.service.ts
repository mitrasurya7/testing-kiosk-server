import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ValidationService } from '../common/validation.service';
import {
  CreateDeviceRequest,
  DeviceResponse,
  UpdateDeviceRequest,
} from '../model/device.model';
import { DeviceValidation } from './device.validation';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class DeviceService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private validationService: ValidationService,
    private eventsGateway: EventsGateway,
  ) {}

  async createDevice(
    createDeviceRequest: CreateDeviceRequest,
  ): Promise<DeviceResponse> {
    this.logger.debug(
      `Create Device at ${JSON.stringify(createDeviceRequest)}`,
    );
    this.validationService.validate(
      DeviceValidation.Create,
      createDeviceRequest,
    );

    const result = await this.prismaService.device.create({
      data: createDeviceRequest,
    });

    return result;
  }

  async GetAllDevices(): Promise<DeviceResponse[]> {
    return await this.prismaService.device.findMany();
  }

  async updateDevice(
    id: string,
    updateDeviceRequest: UpdateDeviceRequest,
  ): Promise<DeviceResponse> {
    this.validationService.validate(
      DeviceValidation.Update,
      updateDeviceRequest,
    );

    const device = await this.prismaService.device.update({
      where: { id },
      data: updateDeviceRequest,
      include: {
        template: true,
      },
    });

    if (device) {
      this.eventsGateway.sendMessage(device);
    }

    return device;
  }

  async getDeviceById(id: string): Promise<DeviceResponse> {
    return await this.prismaService.device.findUnique({
      where: {
        id,
      },
      include: {
        template: {
          include: {
            contents: true,
          },
        },
      },
    });
  }

  async deleteDevice(id: string): Promise<DeviceResponse> {
    return await this.prismaService.device.delete({
      where: {
        id,
      },
    });
  }
}
