let turnSound = new Audio("./Assets/ding.mp3");
let gameoverSound = new Audio("./Assets/gameover.mp3");
let winnerSound = new Audio("./Assets/won.mp3");

let turn = "X";
let gameover = false;

// Fucntion to change the turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");
  let boxes = document.getElementsByClassName("box");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[2]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      document.getElementById("info").innerText =
        boxtexts[e[0]].innerText + " Won";
      gameover = true;
      winnerSound.play();
      e.forEach((index) => {
        boxes[index].classList.add("winning-box");
      });
      document
        .querySelector(".imgbox")
        .getElementsByClassName("trophy")[0].style.width = "4rem";
      document
        .querySelector(".imgbox")
        .getElementsByClassName("winner")[0].style.width = "10rem";
    }
  });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxText.innerText === "" && !gameover) {
      boxText.innerText = turn;
      turnSound.play();
      turn = changeTurn();
      checkWin();
      if (!gameover) {
        document.getElementById("info").innerText = "Turn for " + turn;
      }
    }
  });
});

// Add onClick Listener to button
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  let boxes = document.getElementsByClassName("box");
  Array.from(boxtexts).forEach((box) => {
    box.innerText = "";
  });
  turn = "X";
  gameover = false;
  document.getElementById("info").innerText = "Turn for " + turn;
  Array.from(boxes).forEach((box) => {
    box.classList.remove("winning-box");
  });
  document
    .querySelector(".imgbox")
    .getElementsByClassName("trophy")[0].style.width = "0";
  document
    .querySelector(".imgbox")
    .getElementsByClassName("winner")[0].style.width = "0";
});
