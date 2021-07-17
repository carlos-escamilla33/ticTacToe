

// ------------state----------------//
const gameState = {};

const resetState = () => {
    //This function resets / wipes out the old state and starts over 
    //gameState.players add a property and a value to the gameState object
    //Those two properties are the players described in X and O
    gameState.playerTurns = ["", ""];
    gameState.currentRandomTurn = Math.round(Math.random(0, 1)) === 1 ? "X" : "O";
    gameState.getCurrentPlayer = () => gameState.playerTurns[gameState.currentPlayerIdx];
    gameState.currentPlayerIdx = 0;
    //gameState.board is the setup of the board which is null or "empty"
    gameState.board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
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
}

// -----------Dom Selectors----------//
//We're selecting the board ID from the html doc to use in code below
let boardElm = document.querySelector("#board");
let boardCell = document.querySelector("#board .cell");
let playersTurnElm = document.querySelector("#playerTurn");
let resetElm = document.querySelector("#resetButton");
let playerNamesElm = document.querySelector("#playerNames");
// ------------render--------------//

const gameStateBoard = () => {
    boardElm.innerHTML = "";
    for (let i = 0; i < gameState.board.length; i++) {
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

    if (!gameState.playerTurns[0] || !gameState.playerTurns[1]) {
        text = `
            <input name="player1" placeholder="Enter Player 1">
            <input name="player2" placeholder="Enter Player 2">
            <button class="enter">Start Game</button>
        `
    } else {
        text = `It's currently ${gameState.getCurrentPlayer()}'s turn.`
    }
    playersTurnElm.innerHTML = text;
}

const changeTurn = () => {
    gameState.currentPlayerIdx = (gameState.currentPlayerIdx + 1) % 2;
}
const resetButton = () => {
    let text = `
        <button class="reset">Reset Game</button>
    `
    resetElm.innerHTML = text;
}

const checkWinningConditionsO = () => {

    for (let i = 0; i < gameState.winningPlays.length; i++) {
        if (gameState.playerOSelections.indexOf(gameState.winningPlays[i][0]) >= 0) {
            if (gameState.playerOSelections.indexOf(gameState.winningPlays[i][1]) >= 0) {
                if (gameState.playerOSelections.indexOf(gameState.winningPlays[i][2]) >= 0) {
                    alert(`${gameState.getCurrentPlayer()} won!`);
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
                    alert(`${gameState.getCurrentPlayer()} won!`);
                }
            }
        }
    }
}

const checkForDraw = () => {
    for (let i = 0; i <= gameState.board.length; i++){
        let boardFull = gameState.board[i];
        console.log(boardFull);
    }
}

const aIPlayer = () => {
    if (gameState.playerTurns[0] === "computer" || gameState.playerTurns[1] === "computer"){
        console.log("The computer is playing");
    }
}


    const renderState = () => {
        gameStateBoard();
        changeTurn();
        playerRender();
        resetButton();
        checkWinningConditionsO();
        checkWinningConditionsX();
        checkForDraw();
    }



    // --------------Event Listeners-------------------//
    playersTurnElm.addEventListener("click", function (event) {

        if (event.target.className !== "enter") return;

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
        } else if (!player1Value.length > 0 && player2Value.length > 0) {
            gameState.playerTurns[0] = "computer";
            gameState.playerTurns[1] = player2Value.toLowerCase();
        }
        aIPlayer();
        renderState();
    });

    boardElm.addEventListener("click", function (event) {
        if (event.target.className !== "cell") return

        let cellIdx = event.target.dataset.index;

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
        renderState();
    });

    resetElm.addEventListener("click", function () {
        resetState();
        renderState();
    });

    //----------------Bootstrapping---------------------//
    resetState();
    renderState();