import { CalculationService } from './calculation.service';
import { Cell } from '../../cell/entities/cell.entity';
import { CellService } from '../../cell/services/cell.service';
import { Injectable } from '@nestjs/common';
import { Sudoku } from '../entities/sudoku.entity';
import { SudokuRepository } from '../repos/sudoku.repository';
@Injectable()
export class SudokuService {
  public constructor(
    private sudokuRepo: SudokuRepository,
    private calculator: CalculationService,
    private cellService: CellService,
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
  public async checkSudoku(matrix: any): Promise<void> {
    try {
      console.log(matrix);
      await this.solveSudoku(matrix);
      this.saveNewSudoku(matrix);
      return;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
  public async saveNewSudoku(matrix: any): Promise<void> {
    let sudoku: Sudoku = { cells: [] };

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        let cell = matrix[i][j];
        let foundCell: Cell | undefined = await this.cellService.getCell(
          cell,
          i,
          j,
        );
        if (foundCell) {
          sudoku.cells.push(foundCell);
        } else {
          let newCell: Cell = await this.cellService.saveCell(cell, i, j);
          sudoku.cells.push(newCell);
        }
      }
    }
    this.sudokuRepo.save(sudoku);
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
