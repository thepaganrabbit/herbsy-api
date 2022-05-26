import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { HerbEntity } from '../models/herb.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Herb } from '../types';

@Injectable()
export class CabinetService {
  constructor(
    @InjectRepository(HerbEntity)
    private readonly herbRepository: Repository<HerbEntity>,
  ) {}

  async addHerb(herb: Herb) {
    try {
      const savedEntity = await this.herbRepository.save(herb);
      return savedEntity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getHerbs() {
    try {
      const entities = await this.herbRepository.find({});
      return entities;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getHerb(id: number) {
    try {
      const entity = await this.herbRepository.findOne({ where: { id: id } });
      return entity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // @TODO --> might changer to just have id within body recieved.
  async updateHerb({ id, payload }: { id: number; payload: Herb }) {
    try {
      const updatedEntity: UpdateResult = await this.herbRepository.update(
        id,
        payload,
      );
      if (updatedEntity.affected <= 0) {
        throw new BadRequestException('Unable to update herb');
      }
      const entity = await this.herbRepository.findOne({ where: { id: id } });
      return entity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
