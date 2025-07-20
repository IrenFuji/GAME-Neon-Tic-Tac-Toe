const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let board = Array(9).fill(""); // Stores "X", "O", or ""
let currentPlayer = "X";
let isGameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = +e.target.dataset.index;
  if (!isGameActive || board[index]) return; // Ignore if game over or cell filled

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    isGameActive = false;
  } else if (board.every((cell) => cell)) {
    statusText.textContent = "Draw! 😮";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningCombos.some((combo) =>
    combo.every((index) => board[index] === currentPlayer)
  );
}

function resetGame() {
  board.fill("");
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = "Player X’s turn";
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
