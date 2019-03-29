module.exports = (function() {
  const BOARD_WIDTH = 15;
  const BOARD_HEIGHT = 15;
  const RESPONSE_INVALID = -1;
  const RESPONSE_REGULAR = 0;
  const RESPONSE_WIN = 1;
  // const RESPONSE_WHITE = 1;
  // const RESPONSE_BLACK = 2;
  const CELL_EMPTY = 0;
  const CELL_WHITE = 1;
  const CELL_BLACK = 2;
  const WHITE = 1;
  const BLACK = 2;

  const WINCON = 5;

  const dx = [1, 1, 0, -1];
  const dy = [0, 1, 1, 1];
  let checkMove = function(board, turn, move) {
    /*
      board: 15x15 cells
      move: { x, y }
      cell: { 0: empty, 1: white, 2: black }

      return: {
                -1: invalid move,
                0: possible move nothing happens,
                1: white won,
                2: black won
              }
    */
    let x = move.x;
    let y = move.y;
    if (board[x][y] !== CELL_EMPTY ) return RESPONSE_INVALID;
    board[x][y] = turn;
    for (let i = 0; i < dx.length; i++) {
      let con = 0;
      let X = x;
      let Y = y;
      while (X < BOARD_HEIGHT && X >= 0 &&
             Y < BOARD_HEIGHT && Y >= 0 &&
             board[x][y] == board[X][Y]) {
        con++;
        X += dx[i];
        Y += dy[i];
      }
      X = x-dx[i];
      Y = y-dy[i];
      while (X < BOARD_HEIGHT && X >= 0 &&
             Y < BOARD_HEIGHT && Y >= 0 &&
             board[x][y] == board[X][Y]) {
        con++;
        X -= dx[i];
        Y -= dy[i];
      }

      if (con >= WINCON) return RESPONSE_WIN;
    }
    return RESPONSE_REGULAR;
  };

  return {
    checkMove: checkMove
  }
})();
