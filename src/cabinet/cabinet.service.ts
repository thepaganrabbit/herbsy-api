import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { HerbEntity } from 'src/models/herb.entity';

@Injectable()
export class CabinetService {
    constructor(private readonly herbRepository: Repository<HerbEntity>){}
}
