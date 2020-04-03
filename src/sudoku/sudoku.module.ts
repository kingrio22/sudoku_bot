import { CalculationService } from './services/calculation.service';
import { Cell } from '../cell/entities/cell.entity';
import { CellModule } from '../cell/cell.module';
import { CellRepository } from '../cell/repos/cell.repository';
import { CellService } from '../cell/services/cell.service';
import { CreateTableService } from './services/create-table.service';
import { Module } from '@nestjs/common';
import { Sudoku } from './entities/sudoku.entity';
import { SudokuController } from './controllers/sudoku.controller';
import { SudokuRepository } from './repos/sudoku.repository';
import { SudokuService } from './services/sudoku.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CellModule,
    TypeOrmModule.forFeature([SudokuRepository, CellRepository]),
  ],
  controllers: [SudokuController],
  providers: [
    SudokuService,
    CalculationService,
    CellService,
    CreateTableService,
  ],
})
export class SudokuModule {}
