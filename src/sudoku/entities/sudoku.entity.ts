import { Cell } from '../../cell/entities/cell.entity';
import { SudokuTypeEnum } from '../enums/sudoku-type.enum';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Sudoku {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToMany(type => Cell, { eager: true })
  @JoinTable()
  cells?: Cell[];
}
