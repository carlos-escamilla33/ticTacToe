

// ------------state----------------//
const gameState = {};

const resetState = () => {
    gameState.playerTurns = ["", ""];
    gameState.currentRandomTurn = Math.round(Math.random(0, 1)) === 1 ? "X" : "O";
    gameState.getCurrentPlayer = () => gameState.playerTurns[gameState.currentPlayerIdx];
    gameState.currentPlayerIdx = 0;
    gameState.board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    gameState.win = false;
    gameState.playerXSelections = [];
    gameState.playerOSelections = [];
    gameState.winningPlays = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    gameState.randomSpot = Math.floor(Math.random() * gameState.board.length);
    gameState.openSpaces = [];
}

// -----------Dom Selectors----------//
let boardElm = document.querySelector("#board");
let boardCell = document.querySelector("#board .cell");
let playersTurnElm = document.querySelector("#playerTurn");
let resetElm = document.querySelector("#resetButton");
// ------------render--------------//

const gameStateBoard = () => {
    boardElm.innerHTML = "";
    for (let i = 0; i < gameState.board.length; i++) {
        const square = gameState.board[i];
        const cellElm = document.createElement("div");
        cellElm.classList.add("cell");
        cellElm.innerHTML = square;
        cellElm.setAttribute("id", i);
        boardElm.append(cellElm);
    }
}

const playerRender = () => {
    let text;

    if (!gameState.playerTurns[0] || !gameState.playerTurns[1]) {
        text = `
            <h3>For single player enter Player1 and Start Game.</h3>
            <input name="player1" placeholder="Enter Player 1"><br>
            <input name="player2" placeholder="Enter Player 2"><br>
            <button type="button" class="enter btn btn-outline-success">Start Game</button>
        `
    } else {
        text = `<h3>It's currently ${gameState.getCurrentPlayer()}'s turn.</h3>`
    }
    playersTurnElm.innerHTML = text;
}

const changeTurn = () => {
    gameState.currentPlayerIdx = (gameState.currentPlayerIdx + 1) % 2;
}

const resetButton = () => {
    let text = `
        <button type="button" class="reset btn btn-outline-danger">Reset Game</button>
    `
    resetElm.innerHTML = text;
}

const checkWinningConditionsO = () => {
    for (let i = 0; i < gameState.winningPlays.length; i++) {
        if (gameState.playerOSelections.indexOf(gameState.winningPlays[i][0]) >= 0) {
            if (gameState.playerOSelections.indexOf(gameState.winningPlays[i][1]) >= 0) {
                if (gameState.playerOSelections.indexOf(gameState.winningPlays[i][2]) >= 0) {
                    alert(`${gameState.getCurrentPlayer()} won! Click ResetGame to play again!`);
                    gameState.win = true;
                }
            }
        }
    }
}

const checkWinningConditionsX = () => {
    for (let i = 0; i < gameState.winningPlays.length; i++) {
        if (gameState.playerXSelections.indexOf(gameState.winningPlays[i][0]) >= 0) {
            if (gameState.playerXSelections.indexOf(gameState.winningPlays[i][1]) >= 0) {
                if (gameState.playerXSelections.indexOf(gameState.winningPlays[i][2]) >= 0) {
                    alert(`${gameState.getCurrentPlayer()} won! Click ResetGame to play again!`);
                    gameState.win = true;
                }
            }
        }
    }
}

const checkForDraw = () => {
    if (!gameState.board.includes("") && gameState.win === false|| !gameState.board.includes("") && gameState.win === false){
        alert(`It's a draw! Click Reset Game to play again!`);
    }
}

 const cpuPlayerMove = () => {
    if (gameState.playerTurns[1] === "computer"){
        for (let x = 0; x <= 8; x++){
        }

    }
 }

const renderState = () => {

    gameStateBoard();
    changeTurn();
    playerRender();
    resetButton();

}



    // --------------Event Listeners-------------------//
    playersTurnElm.addEventListener("click", function (event) {

        if (event.target.className !== "enter btn btn-outline-success") return;

        let player1Input = document.querySelector("input[name=player1]");
        let player1Value = player1Input.value;
        let player2Input = document.querySelector("input[name=player2]");
        let player2Value = player2Input.value;

        if (player1Value.length > 0 && player2Value.length > 0) {
            gameState.playerTurns[0] = player1Value.toLowerCase();
            gameState.playerTurns[1] = player2Value.toLowerCase();
        } else if (player1Value.length > 0 && !player2Value.length > 0) {
            gameState.playerTurns[0] = player1Value.toLowerCase();
            gameState.playerTurns[1] = "computer";
        }
        renderState();
    });

    boardElm.addEventListener("click", function (event) {
        if (event.target.className !== "cell") return

        let cellIdx = event.target.id;

        if (gameState.board[cellIdx] !== "") {
            return
        } else {
            gameState.currentRandomTurn = gameState.currentRandomTurn === "X" ? "O" : "X";
            gameState.board[cellIdx] = gameState.currentRandomTurn;
        }
        if (gameState.board[cellIdx] === "X") {
            gameState.playerXSelections.push(parseInt(cellIdx));
        }
        if (gameState.board[cellIdx] === "O") {
            gameState.playerOSelections.push(parseInt(cellIdx));
        }
        checkWinningConditionsO();
        checkWinningConditionsX();
        checkForDraw();
        cpuPlayerMove();
        renderState();
    });

    resetElm.addEventListener("click", function () {
        resetState();
        renderState();
    });

    //----------------Bootstrapping---------------------//
    resetState();
    renderState();