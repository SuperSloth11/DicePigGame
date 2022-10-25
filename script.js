'use strict';
//Selections

const playerOneBox = document.querySelector(".player--0");
const playerTwoBox = document.querySelector(".player--1");

const score0Total = document.querySelector("#score--0");
const score0Current = document.querySelector("#current--0");
const score1Total = document.querySelector("#score--1");
const score1Current = document.querySelector("#current--1");

const diceImage = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const newGameBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");

let totalScores = [0, 0];
let currentScore, activePlayer, playing, dice;

// Functions

function startGame() {
  diceImage.classList.add("hidden");
  score0Total.textContent = 0;
  score0Current.textContent = 0;
  score1Total.textContent = 0;
  score1Current.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

function diceRoll() {
  dice = (Math.trunc((Math.random() * 6)) + 1);
  diceImage.classList.remove("hidden");
  diceImage.src = `dice-${dice}.png`;
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOneBox.classList.toggle('player--active');
  playerTwoBox.classList.toggle('player--active');
};

startGame();

rollBtn.addEventListener('click', function () {
  if (playing) {
    diceRoll();

    //Adding Score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else {
      switchPlayer();
    }
  }
});

//Holding Score

holdBtn.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

    //Win Condition
    if (totalScores[activePlayer] >= 100) {
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      diceImage.classList.add("hidden");
      playing = false;
    }
    else {
      switchPlayer();
    }
  }
});

//Game Reset

newGameBtn.addEventListener('click', function () {
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  playerTwoBox.classList.remove('player--active');
  playerOneBox.classList.add('player--active');
  totalScores = [0, 0];
  startGame();
});