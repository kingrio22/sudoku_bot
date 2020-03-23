import { Sudoku } from '../entities/sudoku.entity';
import { SudokuService } from '../services/sudoku.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Render,
} from '@nestjs/common';

@Controller('sudoku')
export class SudokuController {
  public constructor(private sudokuService: SudokuService) {}

  @Get('id')
  public async getSudokuById(id: number): Promise<Sudoku> {
    try {
      return await this.sudokuService.getSudokuById(id);
    } catch (err) {
      console.log(err);
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/test')
  @Render('sudoku')
  public showSudoku() {
    return;
  }

  @Get()
  public async getSudokuRandom(): Promise<Sudoku> {
    try {
      return await this.sudokuService.getSudokuRandom();
    } catch (err) {
      console.log(err);
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
