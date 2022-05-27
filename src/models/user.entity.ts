import { Herb } from 'src/types';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HerbEntity } from './herb.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_id: string;
  @Column()
  full_name: string;
  @Column()
  email: string;
  @Column()
  passowrd: string;
  @Column()
  createdOn: Date;
}