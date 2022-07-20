"use strict";

let startBox = document.querySelector(".start");
let start_btn = document.querySelector(".start button");
let rulesBox = document.querySelector(".game-rules");
let Continue_btn = document.querySelector(".two-buttons .restart");
let ExitBtn = document.querySelector(".two-buttons .quit");
let gameBox = document.querySelector(".game-box");
let resultBox = document.querySelector(".result-box");
let next_btn = document.querySelector(".next-btn-section button");
let question = document.querySelector(".question p");

let optionsList = document.querySelector(".answer-section .answer-list");
let one = document.querySelector(".options-help .content .one");
let two = document.querySelector(".options-help .content .two ");
let three = document.querySelector(".options-help .content .three ");
let allOptonsHelp = document.querySelector(".options-help");
let finalScore = document.querySelector(".text span.final-score");

let progress = document.querySelectorAll("ul li span");
// console.log(progress);

let currentQueContainer = document.querySelector(".current-question");

let restartBtn = document.querySelector(".result-box .restart");
let exitBtn = document.querySelector(".result-box .exit");
// sounds
let audioNotCorrect = new Audio("./sounds/100-k-1-wrong-answer.mp3");
let audioCorrect = new Audio("./sounds/Correct-answer.mp3");
let startAudio = new Audio("./sounds/Sound-Start .mp3");
let optionHelpSound = new Audio("./sounds/Sound-Help.mp3");
let skipSound = new Audio("./sounds/Skipping.mp3");

let questionNumber = 0;
let nextvActive = 9;
let prevActive = 9;
let currentQue = 1;
let score = 0;

function startGame() {
  startBox.classList.remove("active");
  gameBox.classList.add("active");
  rulesBox.classList.remove("active");
  currentQuestion();
}

function clearAllGame() {
  resultBox.classList.remove("active");
  questionNumber = 0;
  nextvActive = 9;
  prevActive = 9;
  currentQue = 1;
  score = 0;
  progress.forEach(function (li) {
    li.classList.remove("active");
  });
  one.classList.remove("disabled");
  two.classList.remove("disabled");
  three.classList.remove("disabled");
  optionsList.style.pointerEvents = "";
  next_btn.style.display = "none";
  allOptonsHelp.style.pointerEvents = "";
}
let m = 0;
function chickAnswer(option) {
  let userAnswer = option.textContent;
  console.log(userAnswer);
  let correctAnser = questions[questionNumber].answer;
  console.log(correctAnser);
  // console.log(option.textContent, m++);
  audioNotCorrect = new Audio("./sounds/100-k-1-wrong-answer.mp3");
  audioCorrect = new Audio("./sounds/Correct-answer.mp3");
  if (userAnswer === correctAnser) {
    audioCorrect.play();
    console.log("correct");
    option.classList.add("correct");
    progress[prevActive].classList.remove("active");
    progress[nextvActive--].classList.add("active");
    prevActive = nextvActive + 1;
    score++;
    console.log(score);
  } else {
    console.log("Not Correct");
    audioNotCorrect.play();
    option.classList.add("not-correct");
    let allOptions = document.querySelectorAll(".answer-list div");
    allOptions.forEach(function (ans) {
      if (ans.textContent === correctAnser) {
        ans.classList.add("correct");
      }
    });
  }

  optionsList.style.pointerEvents = "none";
  next_btn.style.display = "";
  allOptonsHelp.style.pointerEvents = "none";
}

function showQuestion(index) {
  // console.log("this show Question");
  // Get Question

  question.textContent = `${questions[index].question}`;
  let i = 0;
  const option_list = document.querySelector(".answer-list");
  let option_tag = `
  <div><p>${questions[index].options[0]}</p></div>
  <div><p>${questions[index].options[1]}</p></div>
  <div><p>${questions[index].options[2]}</p></div>
  <div><p>${questions[index].options[3]}</p></div>
  `;
  option_list.innerHTML = option_tag;
  let allOptions = document.querySelectorAll(".answer-list div");
  allOptions.forEach(function (ans) {
    ans.setAttribute("onclick", "chickAnswer(this)");
  });
}

function currentQuestion(current) {
  currentQueContainer.textContent = currentQue;
}

function prepareResult() {
  console.log(score);
  finalScore.textContent = `${score}`;
  let resultMessage = document.querySelector(".result-box .text .message");
  console.log(resultMessage);
  let message;
  if (score >= 7) {
    message = `That's Awesome 🥇`;
  } else if (score >= 5 && score < 7) {
    message = `This is very good 👏`;
  } else if (score > 0 && score < 5) {
    message = `It's okay, try again 💪`;
    restartBtn.textContent = `Try Again`;
  }
  resultMessage.innerHTML = message;
}
/// Help Options
console.log(one);
one.addEventListener("click", function () {
  let allOptions = document.querySelectorAll(".answer-list div");
  optionHelpSound.play();
  one.classList.add("disabled");

  setTimeout(function () {
    let arr = [3, 1, 2, 0];
    let n = 0;
    for (let i = 0; i < 4; i++) {
      if (allOptions[arr[i]].textContent === questions[questionNumber].answer)
        continue;
      else {
        allOptions[arr[i]].textContent = "";
        allOptions[arr[i]].style.pointerEvents = "none";

        n++;
      }
      if (n === 2) break;
    } // end for loop
  }, 4000);
}); // end onklick

// Two
two.addEventListener("click", function () {
  two.classList.add("disabled");
  skipSound.play();
  if (questionNumber < questions.length - 1) showQuestion(++questionNumber);
  else {
    console.log("End Game");
  }
});

// Three
three.addEventListener("click", function () {
  let allOptions = document.querySelectorAll(".answer-list div");
  three.classList.add("disabled");
  optionHelpSound.play();
  setTimeout(function () {
    allOptions.forEach(function (ans) {
      if (ans.textContent === questions[questionNumber].answer) {
        ans.classList.add("correct");
      }
    });
    score++;
    console.log(score);
    optionsList.style.pointerEvents = "none";
    allOptonsHelp.style.pointerEvents = "none";
    next_btn.style.display = "";
    progress[prevActive].classList.remove("active");
    progress[nextvActive--].classList.add("active");
    prevActive = nextvActive + 1;
  }, 4000);
});

start_btn.addEventListener("click", function () {
  startBox.classList.remove("active");
  rulesBox.classList.add("active");
});

Continue_btn.addEventListener("click", function () {
  // console.log(this); // this start btn => is event as a parameter that mian event.target = this = start btn
  startAudio.play();
  startGame();
  next_btn.style.display = "none";
  showQuestion(0);
});

ExitBtn.addEventListener("click", function () {
  rulesBox.classList.remove("active");
  startBox.classList.add("active");
});

next_btn.addEventListener("click", function () {
  audioCorrect.pause();
  audioNotCorrect.pause();
  if (questionNumber < 4) {
    next_btn.style.display = "none";
    optionsList.style.pointerEvents = "";
    allOptonsHelp.style.pointerEvents = "";
    questionNumber++;
    showQuestion(questionNumber);
    currentQue++;
    currentQuestion(currentQue);
  } else {
    startBox.classList.remove("active");

    gameBox.style.transition = "all 0.4s ease";
    gameBox.classList.remove("active");
    resultBox.classList.add("active");
    prepareResult();
  }
});

console.log(restartBtn);
console.log(exitBtn);

restartBtn.addEventListener("click", function () {
  gameBox.style.transition = "all 9s ease";
  clearAllGame();
  startGame();
  next_btn.style.display = "none";
  startAudio.play();
  showQuestion(0);
});

exitBtn.addEventListener("click", function () {
  window.location.reload();
});
