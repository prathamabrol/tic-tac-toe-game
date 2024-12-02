let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let currentPlayer = "O"; // O starts the game
let moveCount = 0; // To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset the game
const resetGame = () => {
  currentPlayer = "O";
  moveCount = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Handle box click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || msgContainer.classList.contains("hide") === false) return;

    box.innerText = currentPlayer;
    moveCount++;
    box.disabled = true;

    let winner = checkWinner();
    
    if (moveCount === 9 && !winner) {
      gameDraw();
    } else if (winner) {
      showWinner(winner);
    } else {
      currentPlayer = currentPlayer === "O" ? "X" : "O";
      updateTurnDisplay();
    }
  });
});

// Update the turn display (optional visual feedback)
const updateTurnDisplay = () => {
  const playerTurn = document.getElementById('turn');
  playerTurn.innerText = `Player ${currentPlayer}'s turn`;
}

// Game Draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes (game over)
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Enable all boxes (game restart)
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Show the winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Player ${winner} wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check if there is a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valA = boxes[a].innerText;
    const valB = boxes[b].innerText;
    const valC = boxes[c].innerText;

    if (valA && valA === valB && valA === valC) {
      return valA;
    }
  }
  return null;
};

// Event listeners for reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Optional: Display whose turn it is on the page
document.body.insertAdjacentHTML('beforeend', `<div id="turn" style="font-size: 1.5rem; color: #EDD3C4;">Player O's turn</div>`);
