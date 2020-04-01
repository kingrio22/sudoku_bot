import { Cell } from 'src/cell/entities/cell.entity';
import { SudokuTypeEnum } from '../enums/sudoku-type.enum';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Sudoku extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: SudokuTypeEnum;

  @OneToMany(
    type => Cell,
    cell => cell.sudoku,
  )
  cell: Cell[];
}
