/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//MAYBE: add functionality to allow player to change game size
const WIDTH = 7;
const HEIGHT = 6;
const htmlBoard = document.getElementById('board')


let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  //loop through each row first
  for (let i = 0; i < HEIGHT; i++) {
    //create an empty row to put the divs in
    let currentRow = [];
    //loop through width of board to fill in subarray with placeholder value
    for (let j = 0; j < WIDTH; j++) {
      currentRow.push(0);
    }
    //add new row array to board array
    board.push(currentRow);
  }
  return board;
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board')
  //create top of game board and add id and event handler for top column
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    //create each top column piece and give id with index value included
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // loop through the set height value to create the set amount of rows
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // loop through the set width value in each row to create the set amount of divs(board pieces)
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    //add each row to the board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  //create array for the column based on the input from x
  let boardColumn = [];
  for (let i = 0; i < HEIGHT; i++) {
    let boardRow = board[i];
    boardColumn.push(boardRow[x])
  }
  //check to see the first part of column that has a piece in it, and return the index(place) above that
  for (let j = 0; j < boardColumn.length; j++) {
    if (boardColumn[j] > 0) {
      return j - 1;
    }
  }
  //if no piece has been played in the column then return the height of the game minus 1 
  return HEIGHT - 1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement("div");
  //get the cell we're adding the piece into
  const cell = document.getElementById(`${y}-${x}`);
  //add correct class to piece depending on current player
  piece.setAttribute("class", `player-${currPlayer}`);
  //add piece to the htmlBoard
  cell.appendChild(piece);
  return;
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  const aboveZero = (val) => val > 0;
  if (board.every(aboveZero)) {
    endGame('The game ends in a draw!');
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      //check if 4 horizontally adjacent pieces are the same player
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //check if 4 vertically adjacent pieces are the same player
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //check if 4 diagonally adjacent pieces to the right are the same player
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //check if 4 diagonally adjacent pieces to the left are the same player
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
