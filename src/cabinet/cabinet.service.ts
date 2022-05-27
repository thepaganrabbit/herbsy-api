import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { HerbEntity } from '../models/herb.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Herb } from '../types';

@Injectable()
export class CabinetService {
  constructor(
    @InjectRepository(HerbEntity)
    private readonly herbRepository: Repository<HerbEntity>,
  ) {}

  async addHerb(herb: Herb, user_id: string) {
    try {
      herb.user_id = user_id;
      const savedEntity = await this.herbRepository.save(herb);
      return savedEntity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getHerbs(user_id: string) {
    try {
      const entities = await this.herbRepository.find({
        where: { user_id },
      });
      if (entities.length <= 0) return [];
      return entities;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getHerb(id: number, user_id: string) {
    try {
      const entity = await this.herbRepository.findOne({ where: { id: id } });
      return entity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateHerb(payload: Herb, user_id: string) {
    const { id, ...rest } = payload;
    try {
      const updatedEntity: UpdateResult = await this.herbRepository.update(
        { id: id, user_id: user_id },
        rest,
      );
      const entity = await this.herbRepository.findOne({ where: { id: id } });
      if (updatedEntity.affected <= 0) {
        throw new BadRequestException(
          `Unable to update ${entity.generic_name}`,
        );
      }
      return entity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteHerb(id: number, user_id: string) {
    try {
      const entity: DeleteResult = await this.herbRepository.delete({
        id: id,
        user_id: user_id,
      });
      if (entity.affected <= 0) {
        throw new BadRequestException('Unable to delete herb');
      }
      return HttpCode(204);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
