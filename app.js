

// ------------state----------------//
const gameState = {};

const resetState = () => {
    //This function resets / wipes out the old state and starts over 
    //gameState.players add a property and a value to the gameState object
    //Those two properties are the players described in X and O
    gameState.playerNames = ["", ""];
    gameState.playerTurns = ["", ""];
    gameState.startingMarker = "O";
    gameState.getCurrentPlayer = () => gameState.playerTurns[gameState.currentPlayerIdx];
    gameState.currentPlayerIdx = 0;
    //gameState.board is the setup of the board which is null or "empty"
    gameState.board = [
        "", "", "",
        "", "", "",
        "", "", ""
      ];
}

// -----------Dom Selectors----------//
//We're selecting the board ID from the html doc to use in code below
let boardElm = document.querySelector("#board");
let playersTurnElm = document.querySelector("#playerTurn");
let resetElm = document.querySelector("#resetButton");
let playerNamesElm = document.querySelector("#playerNames");
// ------------render--------------//

const changeTurn = () => {
    gameState.currentPlayerIdx = (gameState.currentPlayerIdx + 1) % 2;
}

const gameStateBoard = () => {
    boardElm.innerHTML = "";
    for (let i = 0; i < gameState.board.length; i++){
        const square = gameState.board[i];
        
        // createCell
        const cellElm = document.createElement("div");
        cellElm.classList.add("cell");
        cellElm.innerHTML = square;
        cellElm.dataset.index = i;
        boardElm.append(cellElm);
    }
}
console.log(boardElm);

const playerRender = () => {
    let text;
    let players;

    if (!gameState.playerTurns[0] || !gameState.playerTurns[1]){
        text = `
            <input name="player1" placeholder="Enter Player X">
            <input name="player2" placeholder="Enter Player O">
            <button class="enter">Enter</button>
        `
    } else {
        text = `It's currently ${gameState.getCurrentPlayer()}'s turn.`
    }
    playersTurnElm.innerHTML = text;
     
    if (!gameState.playerNames[0] || !gameState.playerNames[1]){
        players = `
            <h2> Player X goes first </h2>
        `
    } else {
        players = `
            <h2> ${gameState.playerNames[0]} vs ${gameState.playerNames[1]} </h2>
        `
    }
    playerNamesElm.innerHTML = players;
}

const resetButton = () => {
    let text = `
        <button class="reset">Reset</button>
    `
    resetElm.innerHTML = text;
}

const renderState = () => {

    //The cells in the gameboard
    gameStateBoard();
    playerRender();
    resetButton();

}



// --------------Event Listeners-------------------//
playersTurnElm.addEventListener("click", function(event){

    if (event.target.className !== "enter") return;

    let player1Input = document.querySelector("input[name=player1]");
    let player1Value = player1Input.value;
    let player2Input = document.querySelector("input[name=player2]");
    let player2Value = player2Input.value;

    if (player1Value.length > 0 && player2Value.length > 0){
        gameState.playerTurns[0] = player1Value.toLowerCase();
        gameState.playerTurns[1] = player2Value.toLowerCase();
        gameState.playerNames[0] = player1Value.toLowerCase();
        gameState.playerNames[1] = player2Value.toLowerCase();
    } else if (player1Value.length > 0 && !player2Value.length > 0){
        gameState.playerTurns[0] = player1Value.toLowerCase();
        gameState.playerTurns[1] = "computer";
        gameState.playerNames[0] = player1Value.toLowerCase();
        gameState.playerNames[1] = "computer";
    } else if (!player1Value.length > 0 && player2Value.length > 0){
        gameState.playerTurns[0] = "computer";
        gameState.playerTurns[1] = player2Value.toLowerCase();
        gameState.playerNames[0] = "computer";
        gameState.playerNames[1] = player2Value.toLowerCase();
    }

    renderState();
});

boardElm.addEventListener("click", function(event){
    if (event.target.className !== "cell") return
    
    let cellIdx = event.target.dataset.index;
    if (gameState.board[cellIdx] !== ""){
      return
    } else {
        gameState.startingMarker = gameState.startingMarker === "O" ? "X" : "O"
        gameState.board[cellIdx] = gameState.startingMarker;
    }
    changeTurn();
    renderState();
});

resetElm.addEventListener("click", function(){
    resetState();
    renderState();
});

//----------------Bootstrapping---------------------//
resetState();
renderState();