import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CabinetController } from './cabinet.controller';
import { CabinetService } from './cabinet.service';

import { HerbEntity } from '../models/herb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HerbEntity])],
  controllers: [CabinetController],
  providers: [CabinetService],
})
export class CabinetModule {}
