// Selecting all elements with the class "cell" and assign them to the "cells" variable.
const cells = document.querySelectorAll(".cell");

// Selecting the element with ID "status" and assign it to the "gameStatus" variable.
const gameStatus = document.querySelector("#status");

// Selecting the element with ID "restart" and assign it to the "restart" variable.
const restart = document.querySelector(".button");

// Define an array of arrays that represent the winning combinations on the game board.
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the cellChoice array with empty strings, and set the starting player to "X" and active to false.
let cellChoice = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let active = false;

// Call the startRound function to begin the game.
startRound();

// Function that starts a new round by adding event listeners to each cell and the restart button, setting the game status, and setting active to true.
function startRound() {
    cells.forEach(cell => cell.addEventListener('click', clickedCell));
    restart.addEventListener('click', gameReset);
    gameStatus.textContent = `${player}'s turn`;
    active = true;
}

// Function that handles a click on a cell. If the cell has already been chosen or the game is not active, return. Otherwise, update the cell, check for a winner, and switch to the other player.
function clickedCell() {
    const cellIndex = this.getAttribute("cellIndex");

    if (cellChoice[cellIndex] != "" || !active) {
        return;
    }

    updateCell(this, cellIndex);
    roundWinner();
}


// Function that updates a cell by setting the corresponding value in cellChoice to the current player and updating the cell text content.
function updateCell(cell, index) {
    cellChoice[index] = player;
    cell.textContent = player;
}

// Function that switches the player from "X" to "O" or vice versa and updates the game status.
function switchPlayer() {
    player = (player == "X") ? "O" : "X";
    gameStatus.textContent = `${player}'s turn`;
}

// Function that checks if there is a winner or if the game is a draw, and updates the game status and active status accordingly.
function roundWinner() {
    let winner = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const condition = winningCombinations[i];
        const cell1 = cellChoice[condition[0]];
        const cell2 = cellChoice[condition[1]];
        const cell3 = cellChoice[condition[2]];

        if (cell1 == "" || cell2 == "" || cell3 == "") {
            continue;
        }
        if (cell1 == cell2 && cell2 == cell3) {
            winner = true;
            break;
        }
    }

    if (winner) {
        gameStatus.textContent = `${player} wins!`;
        active = false;
    }
    else if (!cellChoice.includes("")) {
        gameStatus.textContent = `It's a Draw!`;
        active = false;
    }
    else {
        switchPlayer();
    }
}

// Function that resets the game by setting the starting player to "X", emptying the cellChoice array, resetting the game status, and clearing the cell text content
function gameReset() {
    player = "X";
    cellChoice = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${player}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    active = true;
}
