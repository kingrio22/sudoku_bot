import * as typeormconfigoptions from './ormconfig';
import { CellModule } from './cell/cell.module';
import { ConfigServiceModule } from './config-service/config-service.module';
import { Module } from '@nestjs/common';
import { SudokuModule } from './sudoku/sudoku.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => typeormconfigoptions as TypeOrmModuleAsyncOptions,
    }),
    ConfigServiceModule,
    SudokuModule,
    CellModule,
  ],
})
export class AppModule {}
