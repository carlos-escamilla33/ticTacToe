// -----------Dom Selectors----------//

let boardElm = document.querySelector("#board");

// ------------state----------------//
const gameState = {};

function resetState() {
    gameState.players = ["x", "o"];
    gameState.board = [
        ["null", "null", "null"],
        ["null", "null", "null"],
        ["null", "null", "null"]
      ];
}

resetState();

// ------------render--------------//
function renderState() {
    boardElm.innerHTML = "";
    for (let i = 0; i < gameState.board.length; i++){
        let sections = gameState.board[i];
        for (let x = 0; x < sections.length; x++){
            let square = sections[x];

            // create a cell
            let cellElm = document.createElement("div");
            cellElm.classList.add("cell");
            cellElm.innerHTML = square;
            boardElm.appendChild(cellElm);
        }
    }
}

// // maybe a dozen or so helper functions for tiny pieces of the interface

// listeners
let player1 = gameState.players[0];
let player2 = gameState.players[1];

boardElm.addEventListener("click", function(event){
    if (event.target.className === "cell"){

        renderState();
    }
});

// $('.board').on('click', onBoardClick); // etc

renderState();