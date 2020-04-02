import { Cell } from './cell/entities/cell.entity';
import { ConfigService } from './config-service/config-service.service';
import { Sudoku } from './sudoku/entities/sudoku.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configService = new ConfigService();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: parseInt(configService.get('DB_PORT')),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [Cell, Sudoku],
  synchronize: true,
  migrationsRun: false,
  logging: true,
  logger: 'file',

  //   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  //   cli: {
  //     migrationsDir: 'src/migrations',
  //   },
};

export = typeOrmConfig;
