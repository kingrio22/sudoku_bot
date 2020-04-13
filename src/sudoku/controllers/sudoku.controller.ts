import * as fs from 'fs';
import * as path from 'path';
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

@Controller()
export class SudokuController {
  public constructor(private sudokuService: SudokuService) {}

  @Get('/id/:id')
  public async getSudokuById(
    @Res() res,
    @Param('id') id: number,
  ): Promise<any> {
    try {
      let html = await this.sudokuService.getSudokuById(id);

      res.setHeader('content-type', 'text/html');
      res.send(html);
    } catch (err) {
      console.log(err);
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/')
  showSudoku(@Res() res, sudoku?) {
    let sudokuForRendering = '';
    if (!sudoku) {
    } else {
      sudokuForRendering = sudoku;
    }
    res.sendFile(path.join(process.cwd(), './src/sudoku/frontend/sudoku.html'));
    return;
  }

  @Get('/random')
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
      return await this.sudokuService.checkSudoku(body);
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
