"use strict";

// Importing climpsses
function importClass() {
  return {
    again: document.querySelector(".againBtn"),
    output: document.querySelector(".showOutput"),
    input: document.querySelector(".input"),
    add: document.querySelector(".add"),
    Startguess: document.querySelector(".guess"),
    scoreNum: document.querySelector(".scoreNum"),
    highscoreNum: document.querySelector(".highscoreNum"),
  };
}
let imp = importClass();

// create numbers
let secretNum = Math.ceil(Math.random() * 19) + 1;
let score = 20;
let highscore = 0;

// for validation
let validator;
function validInput() {
  validator;
  if (isNaN(imp.input.value)) {
    return (validator = false);
  } else if (!imp.input.value) {
    return (validator = false);
  } else if (imp.input.value < 1) {
    return (validator = false);
  } else {
    return (validator = true);
  }
}

// init function
function init() {
  imp.scoreNum.textContent = score;
}

// checking answer
let newScore;
function checkAns() {
  if (imp.input.value != secretNum) {
    newScore = --score;
    imp.scoreNum.textContent = newScore;
  } else if (score > highscore) {
    highscore = score;
    imp.highscoreNum.textContent = highscore;
  }
  if (imp.input.value == secretNum) {
    imp.scoreNum.textContent = score;
    imp.highscoreNum.textContent = highscore;
    imp.Startguess.textContent = "Correct Number!";
    document.querySelector("body").style.backgroundColor = "green";
    imp.add.disabled = true;
    imp.output.innerHTML = secretNum;
  } else if (score < 1) {
    document.querySelector("body").style.backgroundColor = "red";
    imp.Startguess.textContent = "you lose this round!";
    imp.add.disabled = true;
  } else if (imp.input.value > 20) {
    imp.Startguess.textContent = "value is bigger than 20!";
  } else if (imp.input.value > secretNum) {
    imp.Startguess.textContent = "too high!";
  } else if (imp.input.value < secretNum) {
    imp.Startguess.textContent = "too low!";
  }
}
// restart
function restart() {
  score = 20;
  imp.scoreNum.textContent = score;
  imp.output.innerHTML = "?";
  imp.Startguess.textContent = "start guessing...";
  document.querySelector("body").style.backgroundColor = "#222";
  secretNum = Math.ceil(Math.random() * 19) + 1;
  let field = document.querySelector(".input");
  field.value = "";
  imp.add.disabled = false;
}

// add events
imp.add.addEventListener("click", () => {
  validInput();
  if (validator === true) {
    checkAns();
  }
});

imp.again.addEventListener("click", (e) => {
  restart();
});
init();
