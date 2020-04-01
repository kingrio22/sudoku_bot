import { Cell } from '../entities/cell.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Cell)
export class CellRepository extends Repository<Cell> {}
