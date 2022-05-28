import { AuthGuard } from '../auth.guard';
import { BadRequestException, CanActivate } from '@nestjs/common';
import { CabinetService } from './cabinet.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CabinetController } from './cabinet.controller';
import { Herb, HerbTypes } from '../types';

describe('CabinetController', () => {
  let controller: CabinetController;
  const cabinetServiceMock = {
    addHerb: jest.fn(),
    getHerbs: jest.fn(),
    getHerb: jest.fn(),
    updateHerb: jest.fn(),
    deleteHerb: jest.fn(),
  };
  let testHerb: Herb = {
    id: 2,
    generic_name: 'Salt',
    type: HerbTypes.GROUND,
    createdOn: new Date(),
  };
  const sampleReq = {
    user: { user_id: 'sjkjjsjs' },
  };
  beforeEach(async () => {
    const mock_guard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CabinetController],
      providers: [CabinetService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_guard)
      .overrideProvider(CabinetService)
      .useValue(cabinetServiceMock)
      .compile();

    controller = module.get<CabinetController>(CabinetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should call getHerbs when getAll is called', async () => {
    await controller.getAll(sampleReq);
    expect(cabinetServiceMock.getHerbs).toHaveBeenCalled();
  });
  it('should call getHerbs when getAll is called and return a []', async () => {
    const mock = jest.fn().mockResolvedValueOnce([testHerb]);
    cabinetServiceMock.getHerbs = mock;
    const results = await controller.getAll(sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload[0]).toEqual(testHerb);
  });
  it('should call getHerbs but fail with a message', async () => {
    const mock = jest.fn().mockRejectedValueOnce(new BadRequestException());
    cabinetServiceMock.getHerbs = mock;
    const results = await controller.getAll(sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload).toBeNull();
    expect(results.message).toContain('Failed');
  });
  it('should call getHerb when getOne is called', async () => {
    await controller.getOne(String(testHerb.id), sampleReq);
    expect(cabinetServiceMock.getHerb).toHaveBeenCalled();
  });
  it('should call getHerb when getOne is called and return a herb', async () => {
    const mock = jest.fn().mockResolvedValueOnce(testHerb);
    cabinetServiceMock.getHerb = mock;
    const results = await controller.getOne(String(testHerb.id), sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload).toEqual(testHerb);
  });
  it('should call getHerb but fail with a message', async () => {
    const mock = jest.fn().mockRejectedValueOnce(new BadRequestException());
    cabinetServiceMock.getHerb = mock;
    const results = await controller.getOne(String(testHerb.id), sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload).toBeNull();
    expect(results.message).toContain('Failed');
  });
  it('should call addHerb when addHerb is called', async () => {
    await controller.addHerb(testHerb, sampleReq);
    expect(cabinetServiceMock.addHerb).toHaveBeenCalled();
  });
  it('should call addHerb when addHerb is called and return a herb', async () => {
    const mock = jest.fn().mockResolvedValueOnce(testHerb);
    cabinetServiceMock.addHerb = mock;
    const results = await controller.addHerb(testHerb, sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload).toEqual(testHerb);
  });
  it('should call addHerb but fail with a message', async () => {
    const mock = jest.fn().mockRejectedValueOnce(new BadRequestException());
    cabinetServiceMock.addHerb = mock;
    const results = await controller.addHerb(testHerb, sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload).toBeNull();
    expect(results.message).toContain('Failed');
  });
  it('should call updateHerb when updateHerb is called', async () => {
    await controller.updateHerb(testHerb, sampleReq);
    expect(cabinetServiceMock.updateHerb).toHaveBeenCalled();
  });
  it('should call updateHerb when updateHerb is called and return a herb', async () => {
    const mock = jest.fn().mockResolvedValueOnce(testHerb);
    cabinetServiceMock.updateHerb = mock;
    const results = await controller.updateHerb(testHerb, sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload).toEqual(testHerb);
  });
  it('should call updateHerb but fail with a message', async () => {
    const mock = jest.fn().mockRejectedValueOnce(new BadRequestException());
    cabinetServiceMock.updateHerb = mock;
    const results = await controller.updateHerb(testHerb, sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload).toBeNull();
    expect(results.message).toContain('Failed');
  });
  it('should call deleteHerb when deleteHerb is called', async () => {
    await controller.deleteHerb(String(testHerb.id), sampleReq);
    expect(cabinetServiceMock.deleteHerb).toHaveBeenCalled();
  });
  it('should call updateHerb when updateHerb is called and return a herb', async () => {
    const mock = jest.fn().mockResolvedValueOnce(204);
    cabinetServiceMock.deleteHerb = mock;
    const results = await controller.deleteHerb(String(testHerb.id), sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload).toEqual(204);
  });
  it('should call updateHerb but fail with a message', async () => {
    const mock = jest.fn().mockRejectedValueOnce(new BadRequestException());
    cabinetServiceMock.deleteHerb = mock;
    const results = await controller.deleteHerb(String(testHerb.id), sampleReq);
    expect(mock).toHaveBeenCalled();
    expect(results.payload).toBeNull();
    expect(results.message).toContain('Failed');
  });
});
