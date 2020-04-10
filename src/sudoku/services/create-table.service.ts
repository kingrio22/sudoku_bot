import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { Sudoku } from '../entities/sudoku.entity';
@Injectable()
export class CreateTableService {
  public async createTable(sudoku: Sudoku, id: number) {
    let table = `
        <table id="sudoku">
        <colgroup><col><col><col>
        <colgroup><col><col><col>
        <colgroup><col><col><col>

        `;

    for (let i = 0; i < sudoku.cells.length; i++) {
      if (i % 27 === 0) {
        table += `<tbody>`;
      }
      if (i % 9 === 0) {
        table += `<tr>`;
      }

      let cell = sudoku.cells[i];
      let even = cell.isEven ? 'even' : '';
      let given = cell.isGiven ? 'given' : 'input';
      let value = cell.value > 0 ? cell.value : `<input type="number">`;
      let row = `<td class="cell text-center ${even} ${given}">${value}</td>`;

      table += row;

      if (i % 9 === 8) {
        table += `</tr>`;
      }
      if (i % 27 === 26) {
        table += `</tbody>`;
      }
    }

    table += `</table>`;

    const sudokuHtml = fs.readFileSync(
      path.join(process.cwd(), './src/sudoku/frontend/rawSudokuHtml.html'),
      'utf-8',
    );
    const template = handlebars.compile(sudokuHtml);
    const compiledSudoku = template({ table });

    return compiledSudoku;
  }
}
