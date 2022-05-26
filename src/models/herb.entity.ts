import { AmountTypes, HerbTypes } from '../types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('herb')
export class HerbEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  generic_name: string;
  @Column({ default: '' })
  scientific_name?: string;
  @Column()
  type: HerbTypes;
  @Column({ default: '' })
  amount_on_hand?: string;
  @Column({ default: '' })
  amount_type?: AmountTypes;
  @Column({ default: null })
  expiration_date?: Date | null;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;
}
