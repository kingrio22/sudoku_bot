import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cell {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  value: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  isEven: boolean;

  @Column()
  isGiven: boolean;
}
