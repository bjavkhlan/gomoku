module.exports = (function() {
  const gomoku = require("./gomoku.js");

  const WHITE = 1;
  const BLACK = 2;

  const BOARD_WIDTH = 15;
  const BOARD_HEIGHT = 15;


  let board = [];
  for (let i = 0; i < 15; i++) {
    board[i] = [];
    for (let j = 0; j < 15; j++)
      board[i].push(0);
  }
  let players = {};
  let turn = 1;

  return {

  }
})();
