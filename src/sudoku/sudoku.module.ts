import { CalculationService } from './services/calculation.service';
import { Module } from '@nestjs/common';
import { Sudoku } from './entities/sudoku.entity';
import { SudokuController } from './controllers/sudoku.controller';
import { SudokuService } from './services/sudoku.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sudoku])],
  controllers: [SudokuController],
  providers: [SudokuService, CalculationService],
})
export class SudokuModule {}
