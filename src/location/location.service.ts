import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LocationValidate } from './location.validation';
import {
  CreateLocationRequest,
  LocationResponse,
  UpdateLocationRequest,
} from '../model/location.model';
import { Logger } from 'winston';
import { ValidationService } from 'src/common/validation.service';

@Injectable()
export class LocationService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private validationService: ValidationService,
  ) {}

  async create(
    createLocationRequest: CreateLocationRequest,
  ): Promise<LocationResponse> {
    this.logger.debug(
      `Create new location ${JSON.stringify(createLocationRequest)}`,
    );
    this.validationService.validate(
      LocationValidate.Create,
      createLocationRequest,
    );

    const location = await this.prismaService.location.create({
      data: createLocationRequest,
    });

    return location;
  }

  async updateLocation(
    id: number,
    UpdateLocationRequest: UpdateLocationRequest,
  ) {
    this.logger.debug(
      `Update location ${id} ${JSON.stringify(UpdateLocationRequest)}`,
    );
    this.validationService.validate(
      LocationValidate.Update,
      UpdateLocationRequest,
    );
    const location = await this.prismaService.location.update({
      where: {
        id: Number(id),
      },
      data: {
        ...UpdateLocationRequest,
      },
    });

    return location;
  }

  async findAll(): Promise<LocationResponse[]> {
    return this.prismaService.location.findMany();
  }

  async findById(id: number): Promise<LocationResponse> {
    return this.prismaService.location.findUnique({
      where: { id: Number(id) },
    });
  }
}
