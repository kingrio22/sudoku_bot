import { AppService } from './app.service';
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
          entities: [Sudoku],
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
  ],
  providers: [AppService],
})
export class AppModule {}
