// Initialize board backups
const initBoardBackups = function(board){
  let boardSize = board.length;
  let boardBackups = [];
  for(let index=0; index<boardSize; index++){
    boardBackups[index] = [];
    copyBoard(board,boardBackups[index]);
  }
  return boardBackups;
}

const createArray = function(size, init){
  let result = [];
  for(let index=0; index<size; index++){
    result[index] = init;
  }
  return result; 
}

// Initialize Board by filling "-"'s in all positions
const generateNewBoard = function (boardSize){
  let board = [];
  for(let row=0;row<boardSize;row++){
    board[row] = [];
    for(let column=0;column<boardSize;column++){
      board[row][column] = " . ";
    }
  }
  return board;
}
let a = 5;
// Print board
const generateBoard = function (board){
  let boardSize = board.length;
  let output = "";
  for(let row=0; row<boardSize; row++){
    for(let column=0; column<boardSize; column++){
      let element = board[row][column];
      if(element == 1){
        element = " . ";
      }
      output += element;
    }
    output += "\n";
  }
  return output;
}

//Mark a column as marked
const markColumn = function (column, board){
  let boardSize = board.length;
  for(let row=0; row<boardSize; row++){
    board[row][column] = 1;
  }
}

//Mark a row as marked
const markRow = function (row, board){
  let boardSize = board.length;
  for(let column=0; column<boardSize; column++){
    board[row][column] = 1;
  }
}

//Mark a diagonal as marked
const markDiagonal = function (row, column, board){
  let boardSize = board.length;
  let diagonalStartConst = row - column;
  let diagonalStartRow = diagonalStartConst;
  let diagonalStartColumn = 0;
  if(diagonalStartConst <= 0){
    diagonalStartRow = 0;
    diagonalStartColumn = Math.abs(diagonalStartConst);
  }

  let isRowNotExceeded = diagonalStartRow < boardSize;
  let isColNotExceeded = diagonalStartColumn < boardSize;

  while(isRowNotExceeded && isColNotExceeded){
    board[diagonalStartRow][diagonalStartColumn] = 1;
    diagonalStartRow++;
    diagonalStartColumn++;
    isRowNotExceeded = diagonalStartRow < boardSize;
    isColNotExceeded = diagonalStartColumn < boardSize;
  }
}

// Reverse board
const reverseBoard = function (board){
  let boardSize = board.length;
  for(let row=0; row<boardSize; row++){
    for(let column=0; column<boardSize/2; column++){
      colToSwapWith = boardSize - column - 1;
      let temp = board[row][column];
      board[row][column] = board[row][colToSwapWith];
      board[row][colToSwapWith] = temp;
    }
  }
}

//Put a queen in a specific position
const putQueen = function (row, column, board){
  let boardSize = board.length;
  markRow(row, board);
  markColumn(column, board);
  markDiagonal(row, column, board);
  let reversedColumn = boardSize - column - 1;
  reverseBoard(board);
  markDiagonal(row, reversedColumn, board);
  reverseBoard(board);
  board[row][column] = " Q ";
}


// Copy the contents of array
const copyBoard = function(source, destination){
  let sourceSize = source.length;
  for(let row=0; row<sourceSize; row++){
    destination[row] = [];
    for(let column=0; column<sourceSize; column++){
      destination[row][column] = source[row][column];
    }
  }
}

const getSolvedBoard = function (board, queenPositions, boardBackups){
  let boardSize = board.length;
  let isQueenPlaced = true;
  for(let row=0; row<boardSize && row >= 0; row++){
    let columnToStart = queenPositions[row];

    if(!isQueenPlaced){
      copyBoard(boardBackups[row], board);
    }
    copyBoard(board, boardBackups[row]);
    isQueenPlaced = false;
    for(let column=columnToStart; column<boardSize; column++){
      let isPlaceMarked = (board[row][column] == 1);
      if(!isPlaceMarked){
        putQueen(row, column, board);
        queenPositions[row] = column + 1;
        isQueenPlaced = true;
        break;
      } 
    }

    if(!isQueenPlaced){
      queenPositions[row] = 0;
      row -= 2;
    }
  }
  return board;
}

const main = function (){
  let boardSize = process.argv[2];
  let numberOfColumns = boardSize;
  let board = generateNewBoard(boardSize);
  let queenPositions = createArray(numberOfColumns, 0);
  let boardBackups = initBoardBackups(board);
  board = getSolvedBoard(board, queenPositions, boardBackups);
  console.log(generateBoard(board));
}

main();
