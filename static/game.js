(()=>{
  let socket = io();
  let color;
  let dotSrc = ["", "static/dotw.png", "static/dotb.png"];
  socket.emit('new player');
  socket.on("color", data => {
    color = data;
    console.log(color);
  });
  socket.on("game over", board => {
    alert("Game over");
  });
  socket.on("state", board => {
    const BOARD_WIDTH = 15;
    const BOARD_HEIGHT = 15;
    let table = document.getElementById("table");
    table.innerHTML = "";
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      let tr = document.createElement("TR");
      for (let j = 0; j < BOARD_WIDTH; j++) {
        let td = document.createElement("TD");
        td.data = { x: i, y: j };
        td.onclick = clickHandler;

        if (board[i][j] !== 0) {
          let dot = document.createElement("img");
          dot.src = dotSrc[board[i][j]];
          dot.style.width = "20px";
          dot.style.margin = "auto";
          td.appendChild(dot);
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  })

  function clickHandler(event) {
    socket.emit("movement", event.target.data);
  }

  window.onload = ()=>{
    const BOARD_WIDTH = 15;
    const BOARD_HEIGHT = 15;
    let table = document.getElementById("table");
    table.innerHTML = "";
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      let tr = document.createElement("TR");
      for (let j = 0; j < BOARD_WIDTH; j++) {
        let td = document.createElement("TD");
        td.data = { x: i, y: j };
        td.onclick = clickHandler;

        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }
})();
