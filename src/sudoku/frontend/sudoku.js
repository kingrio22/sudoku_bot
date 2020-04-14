const baseUrl = 'https://sudoku.kingrio22.io';

document.querySelector('#editbutton').addEventListener('click', editButton);
document.querySelector('#leavebutton').addEventListener('click', leaveEdit);
document.querySelector('#solvebutton').addEventListener('click', solveButton);

let button = document.getElementById('leavebutton');

if (button.classList.contains('leave-hidden')) {
  button.setAttribute('disabled', true);
  button.classList.remove('hover');
} else {
}

function showMessage(messageContent, messageTrue, messageFalse) {
  return new Promise(resolve => {
    document.getElementById('message-text').textContent = messageContent;
    console.log(document.getElementById('message-text'));
    let message = document.getElementById('message');
    let buttonTrue = document.getElementById('message-true');
    let buttonFalse = document.getElementById('message-false');

    buttonTrue.textContent = messageTrue;
    buttonFalse.textContent = messageFalse;

    message.style.display = 'block';

    buttonTrue.onclick = eve => {
      if (eve.isTrusted === true) {
        decission = true;
        message.style.display = 'none';
        resolve(true);
      }
    };
    buttonFalse.onclick = eve => {
      if (eve.isTrusted === true) {
        decission = false;
        message.style.display = 'none';
        resolve(false);
      }
    };
  });
}

function editButton() {
  showMessage('Are you sure? All changes will be lost!', 'Yes', 'No').then(
    decission => {
      if (!decission) {
        return;
      }
      editMode();
    },
  );
}

function editMode() {
  let button = document.getElementById('leavebutton');
  if (button.classList.contains('leave-hidden')) {
    button.classList.remove('leave-hidden');
    button.disabled = false;
    console.log(button);
    button.classList.add('leave-show');
    button.classList.add('hover');
    let cells = document.getElementsByClassName('cell');

    for (const cell of cells) {
      cell.classList.remove('given', 'even', 'input');
      cell.firstChild.remove();
      let inputElem = document.createElement('input');
      inputElem.type = 'text';

      cell.appendChild(inputElem);
    }
  } else {
    button.disabled = true;
    button.classList.add('leave-hidden');
    button.classList.remove('hover');
    return;
  }
}

function solveButton() {
  showMessage('Are you sure? All changes will be lost!', 'Yes', 'No').then(
    decission => {
      if (!decission) {
        return;
      }
      solveSudoku();
    },
  );
}

function solveSudoku() {
  let cells = document.getElementsByClassName('cell');
  let matrix = [];
  for (let i = 0; i < 9; i++) {
    matrix[i] = [];
    for (let j = 0; j < 9; j++) {
      let cell = cells[i * 9 + j];
      let given = false;
      for (classList of cell.classList) {
        if (classList === 'given') {
          given = true;
        }
      }
      if (cell.firstChild.value != '' && given) {
        matrix[i][j] = {
          value: parseInt(cell.firstChild.textContent),
          classList: cell.classList,
        };
      } else {
        matrix[i][j] = {
          value: 0,
          classList: cell.classList,
        };
      }
    }
  }
  let request = new XMLHttpRequest();
  let matrixForFill = undefined;

  request.open('POST', baseUrl + '/solve', true);
  request.setRequestHeader('content-type', 'application/json');
  request.send(JSON.stringify(matrix));
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 201) {
      let response = JSON.parse(request.response);
      matrixForFill = response.result;

      for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = matrixForFill[i].toString();
        if (cells[i].classList.contains('input')) {
          cells[i].style.color = '#FFFFFF';
        }
      }
    }
  };
}

function leaveEdit() {
  validateInputs();

  let cells = document.getElementsByClassName('cell');
  let matrix = [];
  let inputCounter = 0;
  let request = new XMLHttpRequest();
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].firstChild.value != '') {
      inputCounter++;
    }
  }
  //minimale anzahl an given-elements die notwendig ist um ein sudoku lösen zu können
  if (inputCounter < 16) {
    showMessage(
      'Sudoku not solvable! </br> Continue with this one, or try new one?',
      'Continue',
      'Try new',
    ).then(decission => {
      if (!decission) {
        return;
      } else {
        editMode();
      }
    });
  } else {
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
        } else {
          matrix[i][j] = {
            value: 0,
            given: false,
            even: false,
          };
        }
      }
    }
    request.open('POST', baseUrl + '/save', true);
    request.setRequestHeader('content-type', 'application/json');
    request.send(JSON.stringify(matrix));
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 201) {
          console.log('response after save: ', request.response);

          for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            if (cell.firstChild.value != '') {
              let value = cell.firstChild.value;
              cell.classList.add('given');
              cell.firstChild.remove();
              cell.textContent = value.toString();
            } else {
              cell.classList.add('input');
            }
            for (const button of buttons) {
              if (button.style.display === 'none') {
                button.style.display = 'block';
              } else {
                button.style.display = 'none';
              }
            }
          }
        } else {
          alert('sudoku not solvable');
        }
      }
    };
  }
}
validateInputs();

function showSuccessMessage() {
  showMessage('Sudoku solved :)', 'OK', 'Close');
}

function validateInputs() {
  let cells = document.getElementsByClassName('cell');

  for (let i = 0; i < cells.length; i++) {
    cells[i].onchange = event => {
      let response = fillNewMatrix();
      let position = undefined;
      let errorElem = document.getElementById('showError');
      if (event.isTrusted) {
        if (isNaN(parseInt(cells[i].firstChild.value))) {
          errorElem.style.display = 'none';
          errorElem.parentElement.classList.remove('error-line');
          for (const value of values) {
            value.disabled = false;
            value.classList.remove('disabledInput');
            value.parentElement.classList.remove('disabledInput');
          }
          return;
        }
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

        if (
          parseInt(cells[i].firstChild.value) > 9 ||
          parseInt(cells[i].firstChild.value) < 1
        ) {
          duplicateInput = true;
          position = 'number out of range';
        }

        if (duplicateInput) {
          errorElem.textContent = `Last input results in ${position} error`;
          errorElem.parentElement.classList.add('error-line');
          errorElem.style.display = 'block';

          for (const value of values) {
            value.disabled = true;
            value.classList.add('disabledInput');
            value.parentElement.classList.add('disabledInput');
            console.log(value.parentElement);
          }
          cells[i].classList.remove('disabledInput');
          cells[i].firstChild.classList.remove('disabledInput');
          cells[i].firstChild.disabled = false;
        } else {
          errorElem.style.display = 'none';
          errorElem.parentElement.classList.remove('error-line');
          let lastElem = true;
          for (let i = 0; i < values.length; i++) {
            if (values[i].value === '') {
              lastElem = false;
              continue;
            }
          }
          if (lastElem) {
            showSuccessMessage();
          }
          for (const value of values) {
            value.disabled = false;
            value.classList.remove('disabledInput');
            value.parentElement.classList.remove('disabledInput');
          }
        }
      }
    };
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
            values[i].value > 9 ||
            values[i].value < 1
          ) {
            values[i].classList.add('mistake');
          } else {
            values[i].classList.remove('mistake');
          }
        }
      }
    };
  }
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
