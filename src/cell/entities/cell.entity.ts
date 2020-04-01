import { Sudoku } from 'src/sudoku/entities/sudoku.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class Cell extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  isEven: boolean;

  @Column()
  isGiven: boolean;

  @ManyToOne(
    type => Sudoku,
    sudoku => sudoku.cell,
    { cascade: true },
  )
  @JoinTable()
  sudoku: Sudoku;
}
