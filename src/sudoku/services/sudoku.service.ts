import { CalculationService } from './calculation.service';
import { Injectable } from '@nestjs/common';
import { Sudoku } from '../entities/sudoku.entity';
import { SudokuRepository } from '../repos/sudoku.repository';

@Injectable()
export class SudokuService {
  public constructor(
    private sudokuRepo: SudokuRepository,
    private calculator: CalculationService,
  ) {}

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
  public async saveNewSudoku(matrix: any): Promise<void> {
    console.log(matrix);
  }

  public async solveSudoku(matrix: any): Promise<any> {
    let matrixForSolve = [];
    for (let i = 0; i < matrix.length; i++) {
      let cells = [];
      for (let j = 0; j < matrix[i].length; j++) {
        let cell = matrix[i][j];
        let isEven = false;
        for (const index in cell.classList) {
          if (cell.classList[index] === 'even') {
            isEven = true;
          }
        }
        cells.push({
          value: cell.value,
          even: isEven,
        });
      }
      matrixForSolve.push(cells);
    }
    let matrixSolved = await this.calculator.solveSudoku(matrixForSolve);
    let matrixForReturn = [];
    for (let i = 0; i < matrixSolved.length; i++) {
      for (let j = 0; j < matrixSolved[i].length; j++) {
        matrixForReturn.push(matrixSolved[i][j].value);
      }
    }
    return matrixForReturn;
  }
}
