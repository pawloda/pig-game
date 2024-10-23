"use strict";

const btnHold = document.querySelector(".btn-hold");
const btnRoll = document.querySelector(".btn-roll");
const dice = document.querySelector(".dice");
const players = document.querySelectorAll(".player");

let activePlayer;
let currentScore;
let totalScores;

btnHold.addEventListener("click", holdScore);
document.querySelector(".btn-new").addEventListener("click", resetGame);
btnRoll.addEventListener("mouseup", function () {
  hideElements(btnHold, btnRoll);
  setTimeout(() => {
    const diceRollScore = Math.trunc(Math.random() * 6 + 1);
    if (diceRollScore !== 1) {
      setGameAfterRoll(diceRollScore);
    } else {
      dice.src = `img/dice-1.png`;
      resetCurrentScoreAndSwitchPlayer();
      alert(`Player ${activePlayer} rolled 1! 🤕`);
    }
    displayElements(btnRoll);
  }, 100);
});

function holdScore() {
  const position = activePlayer - 1;
  totalScores[position] = totalScores[position] + currentScore;
  document.querySelector(`#total-score-${activePlayer}`).textContent =
    totalScores[position];
  if (totalScores[position] >= 100) {
    finishGame();
  } else {
    resetCurrentScoreAndSwitchPlayer();
    hideElements(btnHold);
  }
}

function resetGame() {
  dice.src = "img/dice-1.png";
  players.forEach((el) => el.classList.remove("player-active"));
  setActivePlayer(Math.round(Math.random() + 1));
  displayElements(dice, btnRoll);
  setScoresToZero();
  hideElements(btnHold);
}

function setGameAfterRoll(diceRollScore) {
  dice.src = `img/dice-${diceRollScore}.png`;
  currentScore += diceRollScore;
  setCurrentScore(currentScore);
  displayElements(btnHold);
}

function resetCurrentScoreAndSwitchPlayer() {
  currentScore = 0;
  setCurrentScore(0);
  activePlayer = getNextPlayerNumber();
  setActivePlayer(activePlayer);
  hideElements(btnHold);
}

function finishGame() {
  hideElements(btnHold, btnRoll);
  setCurrentScore(0);
  alert(`Player ${activePlayer} won the game!!! 😁`);
}

function setScoresToZero() {
  currentScore = 0;
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
  players.forEach((el) => el.classList.remove("player-active"));
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.add("player-active");
}

function hideElements(...elements) {
  elements.forEach((el) => (el.style.display = "none"));
}

function displayElements(...elements) {
  elements.forEach((el) => (el.style.display = "block"));
}

function getNextPlayerNumber() {
  return activePlayer === 1 ? 2 : 1;
}

function setCurrentScore(score) {
  document.querySelector(`#current-score-${activePlayer}`).textContent = score;
}
