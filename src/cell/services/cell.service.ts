import { Cell } from '../entities/cell.entity';
import { CellRepository } from '../repos/cell.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CellService {
  public constructor(private cellRepository: CellRepository) {}

  public async getCell(
    cell: any,
    x: number,
    y: number,
  ): Promise<Cell | undefined> {
    console.log('in get cell', cell);
    let options = {
      where: {
        x: x,
        y: y,
        value: cell.value,
        isEven: cell.even,
        isGiven: cell.given,
      },
    };
    return await this.cellRepository.findOne(options);
  }

  public async saveCell(cell: any, x: number, y: number): Promise<Cell> {
    console.log('in save cell', cell);
    let newCell = {
      x: x,
      y: y,
      value: cell.value,
      isEven: cell.even,
      isGiven: cell.given,
    };
    return await this.cellRepository.save(newCell);
  }
}
