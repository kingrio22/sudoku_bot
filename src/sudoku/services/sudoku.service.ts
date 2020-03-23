import { Injectable } from '@nestjs/common';
import { Sudoku } from '../entities/sudoku.entity';
import { SudokuRepository } from '../repos/sudoku.repository';

@Injectable()
export class SudokuService {
  public constructor(private sudokuRepo: SudokuRepository) {}

  public async getSudokuById(id: number): Promise<Sudoku> {
    try {
      return await this.sudokuRepo.findOne({ id: id });
    } catch (err) {
      throw new Error(err);
    }
  }
  public async getSudokuRandom(): Promise<Sudoku> {
    try {
      return await this.sudokuRepo.findOne();
    } catch (err) {
      throw new Error(err);
    }
  }
}
