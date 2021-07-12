

// ------------state----------------//
const gameState = {};

function resetState() {
    //This function resets / wipes out the old state and starts over 
    //gameState.players add a property and a value to the gameState object
    //Those two properties are the players described in X and O
    gameState.players = ["Player X", "Player O"];
    //gameState.board is the setup of the board which is null or "empty"
    gameState.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
}

// -----------Dom Selectors----------//
//We're selecting the board ID from the html doc to use in code below
let boardElm = document.querySelector("#board");
let buttonElm = document.createElement("button");
let resetButtonElm = document.createElement("button");
let playerContainer = document.querySelector("#playersContainer");
let playerTwo = document.querySelector(".player2");


// ------------render--------------//
function gameStatePlayers(){
    playerContainer.innerHTML = "";
    let player1Title = document.createElement("h2");
    player1Title.classList.add("player1Title");
    player1Title.innerHTML = `${gameState.players[0]} :`;
    playerContainer.append(player1Title);

    let player2Title = document.createElement("h2");
    player2Title.classList.add("player2Title");
    player2Title.innerHTML = `${gameState.players[1]} :`;
    playerContainer.append(player2Title);
}

function gameStateBoard(){
    boardElm.innerHTML = "";
    for (let i = 0; i < gameState.board.length; i++){
        let sections = gameState.board[i];
        for (let x = 0; x < sections.length; x++){
            let square = sections[x];

            // create a cell
            let cellElm = document.createElement("div");
             // add a class so we can style it and target it in the click listener
            cellElm.classList.add("cell");
            //Add the empty / null space to the cellElm
            cellElm.innerHTML = square;
            //Keeping track of the index of the space
            cellElm.dataset.index = x;
            //Append the cell to the board
            boardElm.append(cellElm);
        }
    }
}

function inputs(){

    let player1Input = document.createElement("input");
    player1Input.placeholder = "Enter Player1 X Name";
    player1Input.classList.add("player1");
    boardElm.append(player1Input);

    let player2Input = document.createElement("input");
    player2Input.placeholder = "Enter Player2 O Name"
    player2Input.classList.add("player2");
    boardElm.append(player2Input);


}


function renderState() {
    
    gameStatePlayers();

    //The cells in the gameboard
    gameStateBoard();

    //Creating input boxes for player1 and player2
    inputs();

    // Creating enter button
    buttonElm.classList.add("enterButton");
    buttonElm.innerHTML = "Enter";
    boardElm.append(buttonElm);

    //resetButton
    resetButtonElm.classList.add("resetButton");
    resetButtonElm.innerHTML = "Reset Button";
    boardElm.append(resetButtonElm);
}
console.log(boardElm);
console.log(playerContainer);
// --------------Event Listeners-------------------//
buttonElm.addEventListener("click", function(){
    let playerOne = document.querySelector(".player1").value;
    let playerTwo = document.querySelector(".player2").value;
    document.querySelector(".player2").value = "";
    document.querySelector(".player1").value = "";

        if (playerOne.length > 0 && playerTwo.length > 0){
             gameState.players[0] = playerOne.toLowerCase();
              gameState.players[1] = playerTwo.toLowerCase();
        } else if (playerOne.length > 0 && playerTwo.length === 0){
            gameState.players[0] = playerOne.toLowerCase();
            gameState.players[1] = "computer";
        } else {
            alert("Enter player 1 name first");
        }
        renderState();
        document.querySelector(".player1").disabled = true;
        document.querySelector(".player2").disabled = true;
});

resetButtonElm.addEventListener("click", function(){
    resetState();
    renderState();
});

boardElm.addEventListener("click", function(event){
    if (event.target.className === "cell"){
       event.target.innerHTML = "X";
    };
})

// buttonElm.addEventListener("click", function(){
//     let playerTwo = document.querySelector(".player2").value;
//     document.querySelector(".player2").value = "";

//     gameState.players[1] = playerTwo;
// })
//----------------Bootstrapping---------------------//
resetState();
renderState();