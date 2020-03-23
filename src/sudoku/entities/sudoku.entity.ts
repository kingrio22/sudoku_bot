import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
    } from 'typeorm';
import { SudokuTypeEnum } from '../enums/sudoku-type.enum';

@Entity()
export class Sudoku extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: SudokuTypeEnum;
}
