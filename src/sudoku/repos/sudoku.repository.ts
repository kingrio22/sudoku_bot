import { EntityRepository, Repository } from 'typeorm';
import { Sudoku } from '../entities/sudoku.entity';

@EntityRepository(Sudoku)
export class SudokuRepository extends Repository<Sudoku> {}
