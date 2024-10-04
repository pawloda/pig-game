"use strict";

let activePlayer;
let currentScores;
let totalScores;

document.querySelector(".btn-hold").addEventListener("click", holdScore);
document.querySelector(".btn-new").addEventListener("click", resetGame);
document.querySelector(".btn-roll").addEventListener("click", function () {
  setTimeout(() => {
    const diceRollScore = Math.round(Math.random() * 5 + 1);
    if (diceRollScore !== 1) {
      setGameAfterRoll(diceRollScore);
    } else {
      resetCurrentScoreAndSwitchPlayer();
    }
    co;
  }, 100);
});

function holdScore() {
  const position = activePlayer - 1;
  totalScores[position] = totalScores[position] + currentScores[position];
  document.querySelector(`#total-score-${activePlayer}`).textContent =
    totalScores[position];
  if (totalScores[position] >= 100) {
    finishGame();
  } else {
    resetCurrentScoreAndSwitchPlayer();
    document.querySelector(".btn-hold").style.display = "none";
  }
}

function resetGame() {
  document.querySelector(".dice").src = "resources/dice-1.png";
  document
    .querySelectorAll(".player")
    .forEach((el) => el.classList.remove("player-active"));
  setActivePlayer(Math.round(Math.random() + 1));
  document
    .querySelectorAll(".dice, .btn-roll")
    .forEach((el) => (el.style.display = "block"));
  setScoresToZero();
  document.querySelector(".btn-hold").style.display = "none";
}

function setGameAfterRoll(diceRollScore) {
  document.querySelector(".dice").src = `resources/dice-${diceRollScore}.png`;
  currentScores[activePlayer - 1] += diceRollScore;
  document.querySelector(`#current-score-${activePlayer}`).textContent =
    currentScores[activePlayer - 1];
  document.querySelector(".btn-hold").style.display = "block";
}

function resetCurrentScoreAndSwitchPlayer() {
  currentScores[activePlayer - 1] = 0;
  document.querySelector(`#current-score-${activePlayer}`).textContent = 0;
  activePlayer = getNextPlayerNumber();
  setActivePlayer(activePlayer);
  document.querySelector(".btn-hold").style.display = "none";
}

function finishGame() {
  document.querySelector(".btn-hold").style.display = "none";
  document.querySelector(".btn-roll").style.display = "none";
  document.querySelector(`#current-score-${activePlayer}`).textContent = 0;
  alert(`Player ${activePlayer} won the game!!!`);
}

function setScoresToZero() {
  currentScores = [0, 0];
  totalScores = [0, 0];
  document
    .querySelectorAll(".current-score, .total-score")
    .forEach((el) => (el.textContent = 0));
}

function setActivePlayer(number) {
  activePlayer = number;
  document.querySelector(
    `#name-${activePlayer}`
  ).textContent = `- Player ${activePlayer} -`;
  const inactivePlayer = getNextPlayerNumber();
  document.querySelector(
    `#name-${inactivePlayer}`
  ).textContent = `Player ${inactivePlayer}`;
  document
    .querySelectorAll(".player")
    .forEach((el) => el.classList.remove("player-active"));
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.add("player-active");
}

function getNextPlayerNumber() {
  return activePlayer === 1 ? 2 : 1;
}
