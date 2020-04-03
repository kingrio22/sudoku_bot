import { CellRepository } from './repos/cell.repository';
import { CellService } from './services/cell.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CellRepository])],
  providers: [CellService],
  exports: [CellService],
})
export class CellModule {}
