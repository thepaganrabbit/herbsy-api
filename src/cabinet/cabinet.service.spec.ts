import { BadRequestException } from '@nestjs/common';
import { HerbEntity } from '../models/herb.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CabinetService } from './cabinet.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Herb, HerbTypes } from '../types';

describe('CabinetService', () => {
  let service: CabinetService;

  let entityMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  let testHerb: Herb = {
    id: 2,
    generic_name: 'Salt',
    type: HerbTypes.GROUND,
    createdOn: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CabinetService,
        {
          provide: getRepositoryToken(HerbEntity),
          useValue: entityMock,
        },
      ],
    }).compile();

    service = module.get<CabinetService>(CabinetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call save when called', async () => {
    await service.addHerb(testHerb);
    expect(entityMock.save).toHaveBeenCalled();
  });
  it('should call save when called but fail', async () => {
    entityMock.save = jest
      .fn()
      .mockRejectedValue(new BadRequestException('failed'));
    try {
      await service.addHerb(testHerb);
      expect(entityMock.save).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('failed');
    }
  });
  it('should call find when called', async () => {
    await service.getHerbs();
    expect(entityMock.find).toHaveBeenCalled();
  });
  it('should call find when called but fail', async () => {
    entityMock.find = jest
      .fn()
      .mockRejectedValue(new BadRequestException('failed'));
    try {
      await service.getHerbs();
      expect(entityMock.find).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('failed');
    }
  });
  it('should call findOne when called', async () => {
    await service.getHerb(testHerb.id);
    expect(entityMock.findOne).toHaveBeenCalled();
  });
  it('should call findOne when called but fail', async () => {
    entityMock.findOne = jest
      .fn()
      .mockRejectedValue(new BadRequestException('failed'));
    try {
      await service.getHerb(testHerb.id);
      expect(entityMock.findOne).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('failed');
    }
  });
  it('should call update when called', async () => {
    entityMock.update = jest.fn().mockResolvedValueOnce({ affected: 1 });
    entityMock.findOne = jest.fn().mockResolvedValueOnce(testHerb);
    await service.updateHerb({ id: testHerb.id, payload: testHerb });
    expect(entityMock.update).toHaveBeenCalled();
  });
  it('should call update when called but fail', async () => {
    entityMock.update = jest
      .fn()
      .mockRejectedValueOnce(new BadRequestException('failed'));
    try {
      await service.updateHerb({ id: testHerb.id, payload: testHerb });
      expect(entityMock.update).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('failed');
    }
  });
  it('should call update when called but fails to update', async () => {
    entityMock.update = jest.fn().mockResolvedValueOnce({ affected: 0 });
    try {
      await service.updateHerb({ id: testHerb.id, payload: testHerb });
      expect(entityMock.update).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Unable');
    }
  });
});
