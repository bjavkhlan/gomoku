var socket = io();
/*
  Displays active players
*/
(function() {
  socket.on("active players", players => {
    console.log(players);
    const ul = document.getElementById('active_players');
    ul.innerHTML = "";
    for (let socketId in players) {
      const li = document.createElement("LI");
      li.innerHTML = players[socketId];
      li.data = socketId;
      li.onclick = sendGameRequest;
      ul.appendChild(li);
    }
  });


  /*
    If user clicks on any of active players following function will be invoked
    It sends request to server with socketId of the active player
  */
  function sendGameRequest(event) {
    socket.emit("game request", event.target.data);
  }



  /*
    When user enters to site, it will ask user alias;
  */
  window.onload = () => {

    // const BOARD_WIDTH = 15;
    // const BOARD_HEIGHT = 15;
    // let table = document.getElementById("table");
    // table.innerHTML = "";
    // for (let i = 0; i < BOARD_HEIGHT; i++) {
    //   let tr = document.createElement("TR");
    //   for (let j = 0; j < BOARD_WIDTH; j++) {
    //     let td = document.createElement("TD");
    //     td.data = { x: i, y: j };
    //     td.onclick = clickHandler;
    //
    //     tr.appendChild(td);
    //   }
    //   table.appendChild(tr);
    // }
      document.getElementById("alias_button").onclick = function() {
      socket.emit("new player", document.getElementById("alias_input").value);
      document.getElementById("alias_overlay").style.display = "none";
    }
  }


  function clickHandler(event) {
    socket.emit("movement", event.target.data);
  }
})();
