// Dependencies
let express = require('express');
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');
let gomoku = require("./gomoku.js");

let app = express();
let server = http.Server(app);
let io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

let numPlayers = 0;
let players = {};
let turn = 1;
let board = [];
for (let i = 0; i < 15; i++) {
  board[i] = [];
  for (let j = 0; j < 15; j++)
    board[i].push(0);
}

io.on('connection', function(socket) {
  socket.on('new player', function() {
    if (numPlayers === 2) return;
    players[socket.id] = {
      color: ++numPlayers
    };
    io.sockets.emit('color', numPlayers);
  });
  socket.on('movement', function(data) {
    let color = players[socket.id].color;
    if (turn !== color) return;
    let res = gomoku.checkMove(board, turn, data);
    if (res !== -1) board[data.x][data.y] = color;
    if (res !== -1) turn = (turn%2)+1;
    if (res === 1) io.sockets.emit('game over', board);
    io.sockets.emit('state', board);
  });
});
