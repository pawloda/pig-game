"use strict";

let activePlayer;
let currentScores = [];
let totalScores = [];

document.querySelector(".btn-new").addEventListener("click", resetGame);
document.querySelector(".btn-roll").addEventListener("click", function () {
  const diceRoll = Math.round(Math.random() * 5 + 1);
  document.querySelector(".dice").src = `resources/dice-${diceRoll}.png`;
});

function resetGame() {
  document.querySelector(".dice").src = "resources/dice-1.png";
  document
    .querySelectorAll(".player")
    .forEach((el) => el.classList.remove("player-active"));
  setActivePlayer(Math.round(Math.random() + 1));
  document.querySelector(".dice").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";
  document.querySelector(".btn-roll").style.display = "block";
  setScoresToZero();
}

function setScoresToZero() {
  currentScores = [];
  totalScores = [];
  document
    .querySelectorAll(".current-score, .total-score")
    .forEach((el) => (el.textContent = 0));
}

function setActivePlayer(number) {
  activePlayer = number;
  document.querySelector(
    `#name-${number}`
  ).textContent = `- Player ${number} -`;
  const oppositeNumber = number === 1 ? 2 : 1;
  document.querySelector(
    `#name-${oppositeNumber}`
  ).textContent = `Player ${oppositeNumber}`;
  document.querySelector(`.player-${number}`).classList.add("player-active");
}
