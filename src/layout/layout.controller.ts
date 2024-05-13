import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth } from 'src/common/auth.decorator';
import {
  CreateLayoutRequest,
  LayoutResponse,
  UpdateLayoutRequest,
} from 'src/model/layout.model';
import { WebResponse } from 'src/model/web.model';
import { LayoutService } from './layout.service';

@Controller('/api/layouts')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  // TODO: Add layout
  @Post()
  async addLayout(
    @Auth() user: User,
    @Body()
    createLayoutRequest: CreateLayoutRequest,
  ): Promise<WebResponse<LayoutResponse>> {
    const layout = await this.layoutService.createLayout(createLayoutRequest);

    return {
      data: layout,
    };
  }

  // TODO: Get all layouts
  @Get()
  async getAllLayouts(): Promise<WebResponse<LayoutResponse[]>> {
    const layouts = await this.layoutService.GetAllLayouts();

    return {
      data: layouts,
    };
  }

  // TODO: Update layout
  @Put('/:id')
  async updateLayout(
    @Auth() user: User,
    @Body() updateLayoutRequest: UpdateLayoutRequest,
    @Param('id') id: number,
  ) {
    const layout = await this.layoutService.updateLayout(
      id,
      updateLayoutRequest,
    );
    return {
      data: layout,
    };
  }

  // TODO: Get layout by id
  @Get('/:id')
  async getLayoutById(@Auth() user: User, @Param('id') id: number) {
    const layout = await this.layoutService.getLayoutById(id);
    return {
      data: layout,
    };
  }

  // TODO: Delete layout

  @Delete('/:id')
  async deleteLayout(@Auth() user: User, @Param('id') id: number) {
    const layout = await this.layoutService.deleteLayout(id);
    return {
      data: layout,
    };
  }
}
