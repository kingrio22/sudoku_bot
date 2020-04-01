import { Sudoku } from '../entities/sudoku.entity';
import { SudokuService } from '../services/sudoku.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Render,
  Post,
  Body,
  Param,
  Res,
} from '@nestjs/common';

@Controller('sudoku')
export class SudokuController {
  public constructor(private sudokuService: SudokuService) {}

  @Get('/id/:id')
  public async getSudokuById(@Param('id') id: number): Promise<Sudoku> {
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
  @Post('/save')
  public async saveSudoku(@Body() body: any): Promise<void> {
    try {
      return await this.sudokuService.saveNewSudoku(body);
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/solve')
  public async solveSudoku(@Body() body: any): Promise<any> {
    try {
      let result = await this.sudokuService.solveSudoku(body);
      return { result: result };
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
