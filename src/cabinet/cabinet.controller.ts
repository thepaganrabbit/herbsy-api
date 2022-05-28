import { CabinetService } from './cabinet.service';
import { ApiResponse, Herb } from './../types/index';
import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

@Controller('cabinet')
export class CabinetController {
  constructor(private readonly cabinetService: CabinetService) {}
  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Request() req): Promise<ApiResponse<Herb[]>> {
    try {
      const herbs = await this.cabinetService.getHerbs(req.user.user_id);
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
  @UseGuards(AuthGuard)
  @Get('/herb')
  async getOne(@Query('id') id: string, @Request() req): Promise<ApiResponse<Herb>> {
    try {
      const herb = await this.cabinetService.getHerb(parseInt(id), req.user.user_id);
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
  @UseGuards(AuthGuard)
  @Post()
  async addHerb(@Body() incommingHerb: Herb, @Request() req): Promise<ApiResponse<Herb>> {
    try {
      const herb = await this.cabinetService.addHerb(incommingHerb, req.user.user_id);
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
  @UseGuards(AuthGuard)
  @Put()
  async updateHerb(@Body() incommingUpdatedHerb: Herb, @Request() req): Promise<ApiResponse<Herb>> {
    try {
      const herb = await this.cabinetService.updateHerb(incommingUpdatedHerb, req.user.user_id);
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
  @UseGuards(AuthGuard)
  @Delete()
  async deleteHerb(@Query('id') id: string, @Request() req): Promise<ApiResponse<MethodDecorator>> {
    try {
      const herb = await this.cabinetService.deleteHerb(parseInt(id), req.user.user_id);
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
