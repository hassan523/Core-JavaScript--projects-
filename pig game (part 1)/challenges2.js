var score, roundScore, activePlayer, gamePlaying, winningScore;

init();

/* For btn-roll */
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    /* random number */
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    /*show dice and result*/
    // for dice 1
    document.querySelector("#dice-1").style.display = "block";
    document.querySelector("#dice-1").src = "dice-" + dice1 + ".png";
    //for dice 2
    document.querySelector("#dice-2").style.display = "block";
    document.querySelector("#dice-2").src = "dice-" + dice2 + ".png";

    /*now display and adding score*/
    // nextPlayer();
    if (dice1 !== 1 && dice2 !== 1) {
      // add score
      roundScore = roundScore + dice1 + dice2;
      document.querySelector("#score-" + activePlayer).textContent = roundScore;
    } else if (dice1 === 1 || dice2 === 1) {
      score[activePlayer] <= 0
        ? score[activePlayer] <= 0
        : (score[activePlayer] -= 5);
      document.querySelector("#current-" + activePlayer).textContent =
        score[activePlayer];
      nextPlayer();
    } else {
      nextPlayer();
    }
  }
});

// current current points
document.querySelector(".btn-hold").addEventListener("click", function hold() {
  if (gamePlaying) {
    // for currenting score
    score[activePlayer] = score[activePlayer] + roundScore;
    // updating UI
    document.querySelector("#current-" + activePlayer).textContent =
      score[activePlayer];

    var input = document.querySelector(".final-score").value;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //winning
    if (score[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "winner";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// nextplayer:=
function nextPlayer() {
  // reseting score
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  roundScore = 0;
  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // changing panel
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // hiding dice
  // document.querySelector("#dice-1").style.display = "none";
  // document.querySelector("#dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

// init function
function init() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById("name-0").textContent = "PLAYER 1";
  document.getElementById("name-1").textContent = "PLAYER 2";
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  /* reset score */
  // player 1:
  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  // player 2:
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}
