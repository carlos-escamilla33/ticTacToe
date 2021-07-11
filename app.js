

// ------------state----------------//
const gameState = {};

function resetState() {
    //This function resets / wipes out the old state and starts over 
    //gameState.players add a property and a value to the gameState object
    //Those two properties are the players described in X and O
    gameState.players = ["X", "O"];
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
let inputElm = document.createElement("input");
let buttonElm = document.createElement("button");
let sectionElm = document.querySelector("section")

// ------------render--------------//
function gameStatePlayers(){
    for (let y = 0; y < gameState.players.length; y++){
        let player = gameState.players[y];
        
        // create player element
        let playerElm = document.createElement("h3");
        playerElm.classList.add("player")
        playerElm.innerHTML = `${player} :`;
        playerElm.dataset.index = y;
        boardElm.parentNode.insertBefore(playerElm, boardElm);
        // sectionElm.append(playerElm);
    }
    console.log(sectionElm)
}


function renderState() {
    //This line of code empties the the board of its elements
    boardElm.innerHTML = "";

    gameStatePlayers();

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
    
    console.log(boardElm);
    //Creating input box
    inputElm.placeholder = "Enter Player name";
    inputElm.classList.add("inputSection");
    boardElm.append(inputElm);

    // Creating enter button
    buttonElm.classList.add("enterButton");
    buttonElm.innerHTML = "Enter";
    boardElm.append(buttonElm);
}

// --------------Event Listeners-------------------//

buttonElm.addEventListener("click", function(){
    let playerInput = document.querySelector("input").value;
    //On click this clears the input
    document.querySelector("input").value = "";

    gameState.players[0] = playerInput;

    renderState();
})

//----------------Bootstrapping---------------------//
resetState();
renderState();