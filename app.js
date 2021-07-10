// -----------Dom Selectors----------//

let boardElm = document.querySelector("#board");

// ------------state----------------//
const gameState = {};

function buildInitialState() {
    gameState.players = ["x", "o"];
    gameState.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
}

buildInitialState();

// ------------render--------------//
function renderState() {
    boardElm.innterHTML = "";
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

renderState();
console.log(gameState);
console.log(boardElm);

// // maybe a dozen or so helper functions for tiny pieces of the interface

// // listeners
// function onBoardClick() {
//   // update state, maybe with another dozen or so helper functions...

//   renderState() // show the user the new state
// }

// $('.board').on('click', onBoardClick); // etc