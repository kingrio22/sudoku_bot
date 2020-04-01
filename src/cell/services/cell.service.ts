import { CellRepository } from '../repos/cell.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CellService {
  public constructor(private cellRepository: CellRepository) {}

  public async getCellsForSudoku() {}
  public async saveCellsForSudoku(sudoku) {}
}
