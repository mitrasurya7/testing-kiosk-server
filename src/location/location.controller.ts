import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { Auth } from 'src/common/auth.decorator';
import {
  CreateLocationRequest,
  LocationResponse,
  UpdateLocationRequest,
} from '../model/location.model';
import { User } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post()
  async create(
    @Auth() user: User,
    @Body() createLocationRequest: CreateLocationRequest,
  ): Promise<WebResponse<LocationResponse>> {
    const location = await this.locationService.create(createLocationRequest);
    return {
      data: location,
    };
  }

  @Put('/:id')
  async update(
    @Auth() user: User,
    @Body() updateLocationRequest: UpdateLocationRequest,
    @Param('id') id: number,
  ): Promise<WebResponse<LocationResponse>> {
    const location = await this.locationService.updateLocation(
      id,
      updateLocationRequest,
    );
    return {
      data: location,
    };
  }

  @Get()
  async getAll(@Auth() user: User): Promise<WebResponse<LocationResponse[]>> {
    const locations = await this.locationService.findAll();
    return {
      data: locations,
    };
  }

  @Get('/:id')
  async getById(
    @Auth() user: User,
    @Param('id') id: number,
  ): Promise<WebResponse<LocationResponse>> {
    const location = await this.locationService.findById(id);
    return {
      data: location,
    };
  }
}
