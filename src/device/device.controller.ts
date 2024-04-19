import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';
import {
  CreateDeviceRequest,
  DeviceResponse,
  UpdateDeviceRequest,
} from '../model/device.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  // TODO: Add device
  @Post()
  async addDevice(
    @Auth() user: User,
    @Body()
    createDeviceRequest: CreateDeviceRequest,
  ): Promise<WebResponse<DeviceResponse>> {
    const device = await this.deviceService.CreateDevice(createDeviceRequest);

    return {
      data: device,
    };
  }

  // TODO: Get all devices
  @Get()
  async getAllDevices(): Promise<WebResponse<DeviceResponse[]>> {
    const devices = await this.deviceService.GetAllDevices();

    return {
      data: devices,
    };
  }

  // TODO: Update device
  @Put('/:deviceId')
  async updateDevice(
    @Auth() user: User,
    @Body() updateDeviceRequest: UpdateDeviceRequest,
    @Param('deviceId') deviceId: string,
  ) {
    const device = await this.deviceService.updateDevice(deviceId, updateDeviceRequest);
    return {
      data: device,
    };
  }

  // TODO: Get device by id
  @Get('/:deviceId')
  async getDeviceById(@Auth() user: User, @Param('deviceId') deviceId: string) {
    const device = await this.deviceService.getDeviceById(deviceId);
    return {
      data: device,
    };
  }


  // TODO: Delete device

  @Delete('/:deviceId')
  async deleteDevice(@Auth() user: User, @Param('deviceId') deviceId: string) {
    const device = await this.deviceService.deleteDevice(deviceId);
    return {
      data: device,
    };
  }
}
