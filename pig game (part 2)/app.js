"use strict";
let imp = importing();
let randomnNum, current, activePlayer, scores, winning;
init();

/*********************************** importing ****************************/
function importing() {
  return {
    player0: document.querySelector(".player--0"),
    player1: document.querySelector(".player--1"),
    score0: document.getElementById("score--0"),
    score1: document.getElementById("score--1"),
    current0: document.getElementById("current--0"),
    current1: document.getElementById("current--1"),
    btnNew: document.querySelector(".btn--new"),
    btnRoll: document.querySelector(".btn--roll"),
    btnHold: document.querySelector(".btn--hold"),
    dice: document.querySelector(".dice"),
    input: document.getElementById("inputfield"),
  };
}

/*********************************** function for init ****************************/
function init() {
  current = 0;
  activePlayer = 0;
  scores = [0, 0];
  imp.score0.textContent = "0";
  imp.score1.textContent = "0";
  imp.current0.textContent = "0";
  imp.current1.textContent = "0";
  imp.dice.classList.add("hidden");
  imp.player0.classList.add("player--active");
  imp.btnRoll.disabled = false;
  imp.btnHold.disabled = false;
  imp.input.value = "";
  imp.player0.classList.remove("player--winner");
  imp.player1.classList.remove("player--winner");
}
/*********************************** function random numbers ****************************/
function number() {
  randomnNum = Math.trunc(Math.random() * 6) + 1;
}

/*********************************** function for roll dice ****************************/
function rollDice() {
  // For visible dice
  imp.dice.classList.remove("hidden");
  imp.dice.src = `dice-${randomnNum}.png`;
  current += randomnNum;

  // adding score
  document.getElementById(`score--${activePlayer}`).textContent = current;

  if (randomnNum == 1) {
    if (scores[activePlayer] >= 5) {
      scores[activePlayer] += -5;
    }
    switchPlayer();
  }
}

/******************************* function for winner ****************************/
function winner() {
  if (scores[activePlayer] >= winning) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    let win = document.querySelector(`.player--${activePlayer}`);
    let a = win.parentElement.querySelector("small").classList.add("show-win");
    // classList.add("show-win");
    console.log(a);
    console.log(win);
    // imp.btnRoll.disabled = true;
    // imp.btnHold.disabled = true;
    imp.dice.classList.add("hidden");
  }
}

/***************************** function for switch after dice 1 ****************************/
function switchPlayer() {
  // reset score to 0 after dice is to 1
  document.getElementById(`score--${activePlayer}`).textContent = 0;
  current = 0;

  // add score to current after hold
  scores[activePlayer] += current;
  document.getElementById(`current--${activePlayer}`).textContent =
    scores[activePlayer];

  // switch player after dice is to 1
  imp.player0.classList.toggle("player--active");
  imp.player1.classList.toggle("player--active");

  // switch player
  activePlayer = activePlayer === 1 ? 0 : 1;
  imp.dice.src = `dice-1.png`;
}

/*********************************** function for hold score ****************************/
function holdScore() {
  // add score to current after hold
  scores[activePlayer] += current;
  document.getElementById(`current--${activePlayer}`).textContent =
    scores[activePlayer];

  // add input field
  if (imp.input.value) {
    winning = imp.input.value;
  } else if (imp.input.value == "") {
    winning = 100;
  }

  // if player achive there winning point
  if (scores[activePlayer] >= winning) {
    imp.player0.classList.remove("player--active");
    imp.player1.classList.remove("player--active");
    winner();
  }
}

/************************************** function for events ****************************/
function Addevent() {
  // For restart button
  imp.btnNew.addEventListener("click", () => {
    init();
  });

  // For roll button
  imp.btnRoll.addEventListener("click", () => {
    number();
    rollDice();
  });

  // For hold button
  imp.btnHold.addEventListener("click", () => {
    holdScore();
    switchPlayer();
  });
}
Addevent();
