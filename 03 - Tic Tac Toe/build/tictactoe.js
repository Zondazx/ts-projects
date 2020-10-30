var Player;
(function (Player) {
    Player["X"] = "X";
    Player["O"] = "O";
})(Player || (Player = {}));
var gameActive = true;
var currentPlayer = Player.X;
var gameState = ["", "", "", "", "", "", "", "", ""];
var statusDisplay = document.querySelector(".game--status");
var restart = document.querySelector(".game--restart");
var cells = document.querySelectorAll(".cell");
var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var winMessage = function () { return currentPlayer + " has won!"; };
var drawMessage = function () { return "Game ended in draw!"; };
var currentTurn = function () { return "It's " + currentPlayer + "'s turn!"; };
statusDisplay.innerHTML = currentTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    statusDisplay.innerHTML = currentTurn();
}
function handleResultValidation() {
    var won = false;
    for (var i = 0; i <= winningConditions.length - 1; i++) {
        var winCondition = winningConditions[i];
        var firstCell = gameState[winCondition[0]];
        var secondCell = gameState[winCondition[1]];
        var thirdCell = gameState[winCondition[2]];
        if (firstCell === "" || secondCell === "" || thirdCell === "")
            continue;
        if (firstCell === secondCell && secondCell === thirdCell) {
            won = true;
            break;
        }
    }
    if (won) {
        statusDisplay.innerHTML = winMessage();
        gameActive = false;
        return;
    }
    // let draw = !gameState.includes("");
    // let draw = gameState.indexOf()
    var draw = gameState.every(function (state) { return state !== ""; });
    console.log(draw);
    if (draw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
function handleCellClick(event) {
    var clickedCell = event.target;
    var clickedCellIndex = clickedCell.getAttribute("data-cell-index");
    if (clickedCellIndex === null)
        return;
    var clickedCellIndexValue = parseInt(clickedCellIndex);
    if (gameState[clickedCellIndexValue] !== "" || !gameActive)
        return;
    handleCellPlayed(clickedCell, clickedCellIndexValue);
    handleResultValidation();
}
function handleRestart() {
    gameActive = true;
    currentPlayer = Player.X;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentTurn();
    cells.forEach(function (cell) { return cell.textContent = ""; });
}
cells.forEach(function (cell) { return cell.addEventListener("click", handleCellClick); });
restart === null || restart === void 0 ? void 0 : restart.addEventListener("click", handleRestart);
