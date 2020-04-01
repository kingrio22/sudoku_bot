import { AppService } from './app.service';
import { Cell } from './cell/entities/cell.entity';
import { CellModule } from './cell/cell.module';
import { Module } from '@nestjs/common';
import { Sudoku } from './sudoku/entities/sudoku.entity';
import { SudokuModule } from './sudoku/sudoku.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        ({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'max',
          password: 'root',
          database: 'sudoku',
          entities: [Sudoku, Cell],
          synchronize: true,
          migrationsRun: false,
          logging: true,
          logger: 'file',

          // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
          // cli: {
          //   migrationsDir: '../migrations',
          // },
        } as TypeOrmModuleAsyncOptions),
    }),
    SudokuModule,
    CellModule,
  ],
  providers: [AppService],
})
export class AppModule {}
