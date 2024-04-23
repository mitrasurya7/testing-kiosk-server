import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class DeviceService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private validationService: ValidationService,
  ) {}

  async CreateDevice(
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
    this.logger.debug(
      `Update Device at ${JSON.stringify(updateDeviceRequest)}`,
    );
    this.validationService.validate(
      DeviceValidation.Update,
      updateDeviceRequest,
    );

    const result = await this.prismaService.device.update({
      where: {
        id: id,
      },
      data: {
        ...updateDeviceRequest,
      },
    });

    return result;
  }

  async getDeviceById(id: string): Promise<DeviceResponse> {
    return await this.prismaService.device.findUnique({
      where: {
        id: id,
      },
      include: {
        templates: true,
      }
    });
  }

  async deleteDevice(id: string): Promise<DeviceResponse> {
    return await this.prismaService.device.delete({
      where: {
        id: id,
      },
    });
  }
}
