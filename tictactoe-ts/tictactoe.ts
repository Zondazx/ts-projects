enum Player {
    X = "X",
    O = "O"
}

let gameActive = true;
let currentPlayer: Player = Player.X;
let gameState = ["", "", "", "", "", "", "", "", ""];

const statusDisplay = document.querySelector(".game--status") as HTMLElement;
const restart = document.querySelector(".game--restart");
const cells: NodeList = document.querySelectorAll(".cell");

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winMessage: () => string = () => `${currentPlayer} has won!`;
const drawMessage: () => string = () => `Game ended in draw!`;
const currentTurn: () => string = () => `It's ${currentPlayer}'s turn!`;

statusDisplay.innerHTML = currentTurn();

function handleCellPlayed(clickedCell: HTMLElement, clickedCellIndex: number): void {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange(): void {
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    statusDisplay.innerHTML = currentTurn();
}

function handleResultValidation(): void {
    let won = false;

    for (let i = 0; i <= winningConditions.length - 1; i++) {
        const winCondition = winningConditions[i];

        let firstCell = gameState[winCondition[0]];
        let secondCell = gameState[winCondition[1]];
        let thirdCell = gameState[winCondition[2]];

        if (firstCell === "" || secondCell === "" || thirdCell === "") continue;

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
    let draw = gameState.every(state => state !== "");
    // console.log(draw);

    if (draw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event: Event) {
    const clickedCell: HTMLElement = <HTMLElement> event.target;
    const clickedCellIndex = clickedCell.getAttribute("data-cell-index");

    if (clickedCellIndex === null) return;

    const clickedCellIndexValue = parseInt(clickedCellIndex);

    if (gameState[clickedCellIndexValue] !== "" || !gameActive) return;

    handleCellPlayed(clickedCell, clickedCellIndexValue);
    handleResultValidation();
}

function handleRestart() {
    gameActive = true;
    currentPlayer = Player.X;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentTurn();
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restart?.addEventListener("click", handleRestart);