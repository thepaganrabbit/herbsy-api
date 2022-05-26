import { CabinetService } from './cabinet.service';
import { ApiResponse, Herb } from './../types/index';
import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode } from '@nestjs/common';

@Controller('cabinet')
export class CabinetController {
  constructor(private readonly cabinetService: CabinetService) {}
  @Get()
  async getAll(): Promise<ApiResponse<Herb[]>> {
    try {
      const herbs = await this.cabinetService.getHerbs();
      return {
        payload: herbs,
        message: 'Successfully retrieved herbs',
      };
    } catch (error) {
      return {
        payload: null,
        message: 'Failed to retrieve herbs',
        error: error,
      };
    }
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ApiResponse<Herb>> {
    try {
      const herb = await this.cabinetService.getHerb(parseInt(id));
      return {
        payload: herb,
        message: 'Successfully retrieved herb',
      };
    } catch (error) {
      return {
        payload: null,
        message: 'Failed to retrieve herb',
        error: error,
      };
    }
  }
  @Post()
  async addHerb(@Body() incommingHerb: Herb): Promise<ApiResponse<Herb>> {
    try {
      const herb = await this.cabinetService.addHerb(incommingHerb);
      return {
        payload: herb,
        message: 'Successfully added herb',
      };
    } catch (error) {
      return {
        payload: null,
        message: 'Failed to add herb',
        error: error,
      };
    }
  }
  @Put()
  async updateHerb(@Body() incommingUpdatedHerb: Herb): Promise<ApiResponse<Herb>> {
    try {
      const herb = await this.cabinetService.updateHerb(incommingUpdatedHerb);
      return {
        payload: herb,
        message: 'Successfully updated herb',
      };
    } catch (error) {
      return {
        payload: null,
        message: 'Failed to update herb',
        error: error,
      };
    }
  }
  @Delete(':id')
  async deleteHerb(@Param('id') id: string): Promise<ApiResponse<MethodDecorator>> {
    try {
      const herb = await this.cabinetService.deleteHerb(parseInt(id));
      return {
        payload: herb,
        message: 'Successfully deleted herb',
      };
    } catch (error) {
      return {
        payload: null,
        message: 'Failed to delete herb',
        error: error,
      };
    }
  }
}
