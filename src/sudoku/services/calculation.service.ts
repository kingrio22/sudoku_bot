import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculationService {
  public async solveSudoku(matrixx: number[][]): Promise<any[][]> {
    let fs = require('fs');
    let x = 0;
    let y = 0;
    let matrix = [
      [
        { value: 1, even: false },
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 0, even: true },
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 3, even: false },
      ],
      [
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 0, even: false },
        { value: 6, even: true },
        { value: 0, even: true },
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 0, even: true },
      ],
      [
        { value: 0, even: true },
        { value: 0, even: true },
        { value: 3, even: false },
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 1, even: false },
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 0, even: true },
      ],
      [
        { value: 0, even: true },
        { value: 7, even: false },
        { value: 0, even: false },
        { value: 1, even: false },
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 0, even: true },
        { value: 0, even: false },
        { value: 0, even: true },
      ],
      [
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 8, even: true },
        { value: 0, even: true },
        { value: 0, even: true },
        { value: 0, even: false },
        { value: 5, even: false },
        { value: 0, even: false },
        { value: 0, even: false },
      ],
      [
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 3, even: false },
        { value: 0, even: true },
        { value: 4, even: true },
        { value: 0, even: false },
      ],
      [
        { value: 0, even: true },
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 8, even: true },
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 6, even: true },
        { value: 0, even: false },
        { value: 0, even: true },
      ],
      [
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 0, even: true },
        { value: 1, even: false },
        { value: 0, even: true },
        { value: 0, even: true },
        { value: 0, even: true },
        { value: 0, even: false },
      ],
      [
        { value: 6, even: true },
        { value: 0, even: true },
        { value: 0, even: true },
        { value: 0, even: true },
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 0, even: false },
        { value: 7, even: false },
      ],
    ];

    let columns = [];
    let nulls = 0;
    let counter = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j].value == 0) {
          nulls++;
        }
      }
    }

    do {
      if (matrix[x][y].value === 0) {
        for (let i = 0; i < matrix.length; i++) {
          let column = [];
          for (let j = 0; j < matrix[i].length; j++) {
            column.push(matrix[j][i]);
          }
          columns.push(column);
        }

        for (let i = 1; i <= 9; i++) {
          if (!checkNumbersInMiniSquare(i, x, y)) {
            counter++;
            continue;
          }
          if (checkRowOrCol(i, matrix[x])) {
            counter++;
            continue;
          }
          if (checkRowOrCol(i, columns[y])) {
            counter++;
            continue;
          }
          if (checkSquare(i, x, y)) {
            counter++;
            continue;
          }
          if (checkInCol(i, y)) {
            counter++;
            continue;
          }
          if (checkInRow(i, x)) {
            counter++;
            continue;
          }
        }
      }

      if (y === 8) {
        x++;
        y = 0;
      } else {
        y++;
      }
      if (x >= 9) {
        x = 0;
        y = 0;
      }
    } while (nulls > 0);
    console.log('after while ', counter);
    fs.writeFileSync('matrixFinished.txt', JSON.stringify(matrix));
    return matrix;

    function checkRowOrCol(numberToCheck, array) {
      for (let i = 0; i < array.length; i++) {
        if (numberToCheck === array[i].value) {
          return true;
        }
      }
      return false;
    }

    function checkSquare(numberToCheck, x, y) {
      let rows = [];
      let cols = [];
      for (let i = 0; i < 3; i++) {
        rows.push(x - (x % 3) + i);
        cols.push(y - (y % 3) + i);
      }

      for (let i = rows.length - 1; i >= 0; i--) {
        if (checkRowOrCol(numberToCheck, matrix[rows[i]])) {
          rows.splice(i, 1);
        }

        if (checkRowOrCol(numberToCheck, columns[cols[i]])) {
          cols.splice(i, 1);
        }
      }

      let possibleCells = [];

      for (let i = rows.length - 1; i >= 0; i--) {
        for (let j = cols.length - 1; j >= 0; j--) {
          possibleCells.push({
            x: rows[i],
            y: cols[j],
          });
        }
      }

      for (let i = possibleCells.length - 1; i >= 0; i--) {
        if (matrix[possibleCells[i].x][possibleCells[i].y].value != 0) {
          possibleCells.splice(i, 1);
          continue;
        }
        if (numberToCheck % 2 != 0) {
          if (matrix[possibleCells[i].x][possibleCells[i].y].even) {
            possibleCells.splice(i, 1);
          }
        }
      }

      if (possibleCells.length === 1) {
        if (writeNumberInMatrix(numberToCheck, possibleCells)) {
          return true;
        }
      }
      return false;
    }
    function writeNumberInMatrix(numberToCheck, possibleCells) {
      let x = possibleCells[0].x;
      let y = possibleCells[0].y;
      if (matrix[x][y].even && numberToCheck % 2 != 0) {
        return false;
      }

      matrix[x][y].value = numberToCheck;

      nulls--;
      return true;
    }
    function checkInCol(number, y) {
      let freeCells = getFreeCellsInCol(y);

      for (let i = freeCells.length - 1; i >= 0; i--) {
        if (!checkNumbersInMiniSquare(number, freeCells[i].x, freeCells[i].y)) {
          freeCells.splice(i, 1);
        }
      }
      for (let i = freeCells.length - 1; i >= 0; i--) {
        let s = freeCells[i].x;
        if (checkRowOrCol(number, matrix[s])) {
          freeCells.splice(i, 1);
        }
      }
      if (freeCells.length === 1) {
        if (writeNumberInMatrix(number, freeCells)) {
          return true;
        }
      } else {
        return false;
      }
    }

    function checkInRow(number, x) {
      let freeCells = getFreeCellsInRow(x);
      for (let i = freeCells.length - 1; i >= 0; i--) {
        if (!checkNumbersInMiniSquare(number, freeCells[i].x, freeCells[i].y)) {
          freeCells.splice(i, 1);
        }
      }
      for (let i = freeCells.length - 1; i >= 0; i--) {
        let s = freeCells[i].y;
        if (checkRowOrCol(number, columns[s])) {
          freeCells.splice(i, 1);
        }
      }
      if (freeCells.length === 1) {
        if (writeNumberInMatrix(number, freeCells)) {
          return true;
        }
      } else {
        return false;
      }
    }
    function getFreeCellsInCol(y) {
      let cells = [];
      for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][y].value == 0) {
          cells.push({
            x: i,
            y: y,
          });
        }
      }
      return cells;
    }
    function getFreeCellsInRow(x) {
      let cells = [];
      for (let i = 0; i < matrix.length; i++) {
        if (matrix[x][i].value == 0) {
          cells.push({
            x: x,
            y: i,
          });
        }
      }
      return cells;
    }
    function checkNumbersInMiniSquare(numberToCheck, x, y) {
      for (let i = x - (x % 3); i < x - (x % 3) + 3; i++) {
        for (let j = y - (y % 3); j < y - (y % 3) + 3; j++) {
          if (matrix[i][j].value != 0) {
            if (matrix[i][j].value === numberToCheck) {
              return false;
            }
          }
        }
      }
      return true;
    }
  }
}
