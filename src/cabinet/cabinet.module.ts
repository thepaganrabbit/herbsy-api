import { UserEntity } from 'src/models/user.entity';
import { UserService } from './../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CabinetController } from './cabinet.controller';
import { CabinetService } from './cabinet.service';

import { HerbEntity } from '../models/herb.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('SECRET'),
    }),
    inject: [ConfigService],
  }),TypeOrmModule.forFeature([HerbEntity, UserEntity])],
  controllers: [CabinetController],
  providers: [CabinetService, UserService],
})
export class CabinetModule {}
