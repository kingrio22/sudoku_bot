document.querySelector('#editbutton').addEventListener('click', editMode);
document.querySelector('#leavebutton').addEventListener('click', leaveEdit);

function editMode() {
  console.log('in edit mode');
  let buttons = document.getElementsByTagName('button');
  for (const button of buttons) {
    if (button.style.display === 'none') {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  }
  let cells = document.getElementsByClassName('cell');

  for (const cell of cells) {
    cell.classList.remove('given', 'even', 'input');
    console.log(cell);
    cell.firstChild.remove();
    let inputElem = document.createElement('input', { type: number });

    cell.appendChild(inputElem);
    console.log(cell);
  }
}

function leaveEdit() {
  let buttons = document.getElementsByTagName('button');
  for (const button of buttons) {
    if (button.style.display === 'none') {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  }
  let cells = document.getElementsByClassName('cell');
  let matrix = [];
  for (let i = 0; i < 9; i++) {
    matrix[i] = [];
    for (let j = 0; j < 9; j++) {
      let cell = cells[i * 9 + j];
      if (cell.firstChild.value != '') {
        matrix[i][j] = {
          value: parseInt(cell.firstChild.value),
          given: true,
          even: false,
        };
        cell.classList.add('given');
        cell.textContent = cell.firstChild.value;
        cell.firstChild.remove();
      } else {
        matrix[i][j] = {
          value: 0,
          given: false,
          even: false,
        };
        cell.classList.add('input');
      }
    }
  }
  console.log(matrix);
}

let values = document.getElementsByTagName('input');
for (let i = 0; i < values.length; i++) {
  values[i].oninput = value => {
    if (value.isTrusted) {
      if (values[i].value == '') {
        values[i].classList.remove('mistake');
      } else {
        if (
          (values[i].parentElement.classList[1] === 'even' &&
            values[i].value % 2 != 0) ||
          values[i].value > 9
        ) {
          values[i].classList.add('mistake');
        } else {
          values[i].classList.remove('mistake');
        }
      }
    }
  };
}

let cells = document.getElementsByClassName('cell');

for (let i = 0; i < cells.length; i++) {
  cells[i].onchange = eve => {
    let response = fillNewMatrix();
    let position = undefined;
    if (eve.isTrusted) {
      let duplicateInput = false;
      let neededCol = extractColFromMatrix(
        response.matrix,
        response.changedCell.col,
      );
      if (hasDuplicates(response.matrix[response.changedCell.row])) {
        position = 'row';
        duplicateInput = true;
      } else if (hasDuplicates(neededCol)) {
        duplicateInput = true;
        position = 'col';
      } else if (
        checkNumbersInMiniSquare(
          response.matrix[response.changedCell.row][response.changedCell.col],
          response.changedCell.row,
          response.changedCell.col,
          response.matrix,
        )
      ) {
        duplicateInput = true;
        position = 'square';
      }

      let errorElem = document.getElementById('showError');
      if (duplicateInput) {
        errorElem.textContent = `Last input results in ${position} error`;
        errorElem.style.display = 'block';

        for (const value of values) {
          value.disabled = true;
          value.classList.add('disabledInput');
          value.parentElement.classList.add('disabledInput');
        }
        cells[i].classList.remove('disabledInput');
        cells[i].firstChild.classList.remove('disabledInput');
        cells[i].firstChild.disabled = false;
      } else {
        errorElem.style.display = 'none';
        for (const value of values) {
          value.disabled = false;
          value.classList.remove('disabledInput');
          value.parentElement.classList.remove('disabledInput');
        }
      }
    }
  };
}

function hasDuplicates(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[i] != '' && array[j] != '' && i != j) {
        if (array[i] === array[j]) {
          return true;
        }
      }
    }
  }
  return false;
}
function extractColFromMatrix(matrix, col) {
  let extractedCol = [];
  for (let i = 0; i < 9; i++) {
    extractedCol.push(matrix[i][col]);
  }
  console.log(extractedCol);
  return extractedCol;
}

function checkNumbersInMiniSquare(numberToCheck, x, y, matrix) {
  for (let i = x - (x % 3); i < x - (x % 3) + 3; i++) {
    for (let j = y - (y % 3); j < y - (y % 3) + 3; j++) {
      if (i === x && y === j) {
        continue;
      }
      if (matrix[i][j] != '') {
        if (matrix[i][j] === numberToCheck) {
          return true;
        }
      }
    }
  }
  return false;
}

function fillNewMatrix() {
  let counter = 0;
  let matrix = [];
  let changedCell = {
    row: undefined,
    col: undefined,
  };
  let cells = document.getElementsByClassName('cell');
  for (let i = 0; i < 9; i++) {
    matrix[i] = [];
    for (let j = 0; j < 9; j++) {
      let value;
      if (cells[i * 9 + j].firstElementChild) {
        counter++;
        value = parseInt(cells[i * 9 + j].firstChild.value);
        if (!isNaN(value)) {
          console.log('in if', value);
          changedCell.row = i;
          changedCell.col = j;
        }
      } else {
        value = cells[i * 9 + j].textContent;
      }
      if (isNaN(parseInt(value))) {
        matrix[i].push('');
        continue;
      }

      matrix[i].push(parseInt(value));
    }
  }
  console.log(counter);
  let response = {
    matrix: matrix,
    changedCell: changedCell,
  };
  return response;
}
