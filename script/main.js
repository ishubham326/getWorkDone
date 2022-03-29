/***************GLOBAL BEHAVIOUR*****************/
//to prevent right click menu
window.oncontextmenu = (e) => {
  e.preventDefault();
};

/***************ROCK PAPER SCISSORS*****************/

//grabbing all the elements
//returns list of all three buttons
const rpsPlayBtn = document.querySelectorAll(".hand");
const rpsResetBtn = document.querySelector("#rps-reset");
let pcPlayedHeading = document.querySelector("#pc-played");
let playerPlayedHeading = document.querySelector("#you-played");
let rpsWinnerHeading = document.querySelector("#winner-text");
let pcScoreHeading = document.querySelector("#pc-score");
let playerScoreHeading = document.querySelector("#you-score");
let pcScore = 0;
let playerScore = 0;

//reset everything to original state when reset button is pressed
rpsResetBtn.addEventListener("click", function () {
  pcScore = 0;
  playerScore = 0;
  playerScoreHeading.textContent = "0";
  pcScoreHeading.textContent = "0";
  rpsWinnerHeading.textContent = "MAKE YOUR MOVE";
  pcPlayedHeading.textContent = "R/P/S";
  playerPlayedHeading.textContent = "R/P/S";
});

//get random pcMove, produce random num and get that element from the array
function pcPlayed() {
  let moves = ["rock", "paper", "scissors"];
  let pcMove = moves[Math.floor(Math.random() * moves.length)];
  return pcMove;
}

//function to see who wins when a move button is clicked
rpsPlayBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    //set appropriate values for player and PC
    let playerMove = btn.value;
    let pcMove = pcPlayed();

    //change text values on display
    playerPlayedHeading.textContent = playerMove.toUpperCase();
    pcPlayedHeading.textContent = pcMove.toUpperCase();

    //Depending on what was played and randomly generated,
    //change the winner text displayed
    //increment the win amounts
    if (playerMove === pcMove) {
      rpsWinnerHeading.textContent = "TIE";
      return;
      //console.log("Tie");
    } else if (playerMove === "rock" && pcMove === "scissors") {
      playerScore++;
      playerScoreHeading.textContent = playerScore;
      rpsWinnerHeading.textContent = "YOU WIN 🎉";
      return;
      //console.log("Player Wins");
    } else if (playerMove === "scissors" && pcMove === "paper") {
      playerScore++;
      playerScoreHeading.textContent = playerScore;
      rpsWinnerHeading.textContent = "YOU WIN 🎉";
      return;
      //console.log("Player Wins");
    } else if (playerMove === "paper" && pcMove === "rock") {
      playerScore++;
      playerScoreHeading.textContent = playerScore;
      rpsWinnerHeading.textContent = "YOU WIN 🎉";
      return;
      //console.log("Player Wins");
    } else if (playerMove === "paper" && pcMove === "scissors") {
      pcScore++;
      pcScoreHeading.textContent = pcScore;
      rpsWinnerHeading.textContent = "PC WINS 💻";
      return;
      //console.log("PC Wins");
    } else if (playerMove === "scissors" && pcMove === "rock") {
      pcScore++;
      pcScoreHeading.textContent = pcScore;
      rpsWinnerHeading.textContent = "PC WINS 💻";
      return;
      //console.log("PC Wins");
    } else if (playerMove === "rock" && pcMove === "paper") {
      pcScore++;
      pcScoreHeading.textContent = pcScore;
      rpsWinnerHeading.textContent = "PC WINS 💻";
      return;
      //console.log("PC Wins");
    }
  });
});

/***************MINESWEEPER*****************/
//minesweeper game by 101computing.net - https://codepen.io/101Computing/details/wEbEqx
//opensource, and uploaded on codepen with free rights with credits
var grid = document.getElementById("grid"); //grabbing the table
var testMode = false; //Turn this to true to see where the mines are
var mineHighScore = 0;
var mineScore = 0;
var mineHighScoreDisplay = document.getElementById("mine-score");
var mineScoreDisplay = document.getElementById("current-mine-score");
var gameOver = document.getElementById("gameover");
var won = document.getElementById("won");
generateGrid();

function generateGrid() {
  //generate 10 by 10 grid
  grid.innerHTML = ""; //emptying out the grid
  gameOver.className = ""; //I ADDED THIS - removing class
  won.className = ""; //I ADDED THIS - removing class
  resetScores(); //I ADDED THIS - running function
  for (let i = 0; i < 10; i++) {
    //adding 10 rows and 10 cells to each row
    row = grid.insertRow(i);
    for (let j = 0; j < 10; j++) {
      cell = row.insertCell(j);
      //each cell can trigger a function called clickCell when it's clicked upon
      cell.onclick = function () {
        clickCell(this);
      };
      cell.oncontextmenu = function () {
        rightClickCell(this);
      };
      //create an attribute to later assign random cell mine values (place mines here)
      let mine = document.createAttribute("data-mine");
      mine.value = "false";
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}

function addMines() {
  //Add mines randomly
  //pick 20 random row and column numbers and set mines attribute for those cells to true
  for (let i = 0; i < 20; i++) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let cell = grid.rows[row].cells[col];
    cell.setAttribute("data-mine", "true");
    if (testMode) cell.innerText = "X";
  }
}

function revealMines() {
  //Highlight all mines
  //if this function is called, attach the class name mine to cells with the attribute mine to true
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = grid.rows[i].cells[j];
      if (cell.getAttribute("data-mine") == "true") {
        cell.className = "mine";
        cell.innerText = "X";
      }
    }
  }
}

function checkLevelCompletion() {
  let levelComplete = true;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (
        grid.rows[i].cells[j].getAttribute("data-mine") == "false" &&
        grid.rows[i].cells[j].innerHTML == ""
      )
        levelComplete = false;
    }
  }
  if (levelComplete) {
    won.className = "show";
    //alert("You Win!");
    revealMines();
  }
}

function clickCell(cell) {
  //Check if the end-user clicked on a mine
  //if it's a mine, call revealMines to show all the rest

  if (cell.innerText === "!") {
    //I ADDED THIS
    return;
  }
  if (cell.getAttribute("data-mine") == "true") {
    revealMines();
    //alert("Game Over");
    gameOver.className = "show"; //I ADDED THIS
  } else {
    cell.className = "clicked";
    //Count and display the number of adjacent mines
    let mineCount = 0;
    let cellRow = cell.parentNode.rowIndex;
    let cellCol = cell.cellIndex;
    //alert(cellRow + " " + cellCol);
    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
      for (
        let j = Math.max(cellCol - 1, 0);
        j <= Math.min(cellCol + 1, 9);
        j++
      ) {
        if (grid.rows[i].cells[j].getAttribute("data-mine") == "true")
          mineCount++;
      }
    }
    cell.innerText = mineCount;
    if (mineCount == 0) {
      //Reveal all adjacent cells as they do not have a mine
      for (
        let i = Math.max(cellRow - 1, 0);
        i <= Math.min(cellRow + 1, 9);
        i++
      ) {
        for (
          let j = Math.max(cellCol - 1, 0);
          j <= Math.min(cellCol + 1, 9);
          j++
        ) {
          //Recursive Call
          if (grid.rows[i].cells[j].innerHTML == "")
            clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    //I ADDED THIS - to calculate score
    mineScore += mineCount * 5;
    mineScoreDisplay.innerText = mineScore;
    checkLevelCompletion();
  }
}

//I ADDED THIS
function rightClickCell(cell) {
  //called when a right click occurs, fills the cell text with ! to mark as flagged
  cell.innerText = cell.innerText === "!" ? "" : "!";
}
//I ADDED THIS
function resetScores() {
  //reset current score to 0 and highscore to highest value
  if (mineScore > mineHighScore) mineHighScore = mineScore;
  mineHighScoreDisplay.innerText = mineHighScore;
  mineScore = 0;
  mineScoreDisplay.innerText = 0;
}

/***************TODO LIST*****************/
//grabbing everything
const todoInput = document.querySelector(".todo-input");
const todoAddBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");

//function calls based on clicks
todoAddBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkTrash);
filter.addEventListener("click", filterList);

//adds new todo item to the ul
function addTodo(event) {
  //stop page refreshing
  event.preventDefault();
  //only add if the field is not empty
  if (todoInput.value) {
    //create list element and add text
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-list-item");
    newTodo.innerText = todoInput.value;

    //create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("list-buttons");

    //create buttons
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("checked");
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`; //font awesome icon html
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("deleted");
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;

    //appending things appropriately to get the entire element
    todoDiv.append(checkBtn);
    todoDiv.append(trashBtn);
    newTodo.append(todoDiv);
    todoList.append(newTodo);

    //clear input values
    todoInput.value = "";
  }
}

//function to see if checked button or trash button was clicked
function checkTrash(event) {
  const btnClicked = event.target;
  //add class completed, this will not only apply styles but also her sort later
  const todo = btnClicked.parentElement.parentElement; //li
  if (btnClicked.className === "checked") {
    todo.classList.toggle("completed");
  }
  //if deleted button, then add fall class (for animation) then
  //remove the element all together
  else if (btnClicked.className === "deleted") {
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
}

//filter the list based on selection
function filterList(event) {
  const selected = event.target.value;
  const allTodos = todoList.childNodes;
  //go through each element within our UL and change its display property
  // appropriately based on the classes it has or does not have
  allTodos.forEach((todo) => {
    switch (selected) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) todo.style.display = "flex";
        else todo.style.display = "none";
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) todo.style.display = "flex";
        else todo.style.display = "none";
        break;
    }
  });
}

/***************POMODORO TIMER*****************/
//grabbing everything - selectors
let timerDisplay = document.querySelector("#pom-timer");
let startPauseButton = document.querySelector("#pom-start");
let timerBack = document.querySelector("#pomodoro");
let timerBlock = document.querySelector(".pom-timer-block");
let pomodoroSettingsBtn = document.querySelector("#pomodoro-settings-button");
let updateSettingsBtn = document.querySelector("#update-timer");
let resetSessionsBtn = document.querySelector("#reset-session");
let closePomodoroSettingsBtn = document.querySelector(
  "#close-pomodoro-settings"
);
let pomodoroSettingsDisplay = document.querySelectorAll(".settings")[0];
let focusPeriodDsiplay = document.querySelector("#focus-period-display");
let shortBreakDsiplay = document.querySelector("#short-break-display");
let longBreakDsiplay = document.querySelector("#long-break-display");
let sessionNumDisplay = document.querySelector("#session-display");
let pomodoroValues = document.querySelectorAll(".pomodoro-values");
//Sounds used are under creative common rights, and free to use
//https://freesound.org/people/graham_makes/sounds/457518/
//https://freesound.org/people/melokacool/sounds/616697/
let breakAudio = new Audio("break-notification.wav");
let sessionAudio = new Audio("session-end-notification.wav");

//initializing variable values
let totalSessions = 4;
let currentSession = 1;
let seconds = 60;
let sessionLength = 25;
let minutes = sessionLength - 1;
let shortBreakLength = 5;
let longBreakLength = 30;
let breakCheck = true;
let timer;
let timerPaused = true;

//setting display values to variable values
timerDisplay.textContent = `${sessionLength}:00`;
focusPeriodDsiplay.textContent = `${sessionLength} mins`;
shortBreakDsiplay.textContent = `${shortBreakLength} mins`;
longBreakDsiplay.textContent = `${longBreakLength} mins`;
sessionNumDisplay.textContent = `${currentSession}/4`;

//runs after each session and/or break ends
function updateSessions() {
  if (!breakCheck) {
    breakCheck = !breakCheck;
    minutes = sessionLength;
    breakAudio.play();
    timerBack.classList.remove("pomo-break-back");
    timerBlock.classList.remove("pomo-break-block");
    if (currentSession < totalSessions) {
      currentSession++;
      sessionNumDisplay.textContent = `${currentSession}/4`;
    } else if (currentSession === totalSessions) resetSession();
  } else {
    breakCheck = !breakCheck;
    //for styles
    timerBack.classList.add("pomo-break-back");
    timerBlock.classList.add("pomo-break-block");
    breakAudio.play();
    if (currentSession === totalSessions) minutes = longBreakLength;
    else minutes = shortBreakLength;
  }
}

//starts the interval that runs ever 1000ms
//keep track of time by using a variable so it can paused, easily without saving any values
function startTimer() {
  timer = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      if (minutes <= 0 && seconds < 0) {
        updateSessions();
      }
      minutes--;
      seconds = 59;
    }
    timerDisplay.textContent = `${minutes}:${seconds.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  }, 1000);
}

//clear the timer
function pauseTimer() {
  clearInterval(timer);
}

//resets all the values for timer
function resetSession() {
  sessionAudio.play();
  clearInterval(timer);
  currentSession = 1;
  sessionLength = pomodoroValues[0].value;
  minutes = sessionLength - 1;
  shortBreakLength = pomodoroValues[1].value;
  longBreakLength = pomodoroValues[2].value;
  breakCheck = true;
  timerPaused = true;
  updateDisplay();
}

//runs when the form is submitted, i.e update button is pressed
//grabs appropriate values from the fields and sets them to the variables used throughout
function updateSessionsVar(event) {
  event.preventDefault();
  clearInterval(timer);
  let newSessionLength = pomodoroValues[0].value;
  let newShortBreakLength = pomodoroValues[1].value;
  let newLongBreakLength = pomodoroValues[2].value;
  currentSession = 1;
  seconds = 60;
  minutes = newSessionLength - 1;
  sessionLength = newSessionLength;
  shortBreakLength = newShortBreakLength;
  longBreakLength = newLongBreakLength;
  breakCheck = true;
  timerPaused = true;
  updateDisplay();
}

//on screen values are updated everytime this is called
function updateDisplay() {
  timerDisplay.textContent = `${sessionLength}:00`;
  focusPeriodDsiplay.textContent = `${sessionLength} mins`;
  shortBreakDsiplay.textContent = `${shortBreakLength} mins`;
  longBreakDsiplay.textContent = `${longBreakLength} mins`;
  sessionNumDisplay.textContent = `${currentSession}/4`;
  startPauseButton.textContent = "START";
  pomodoroSettingsDisplay.classList.remove("settings-show");
}

//button click event listeners, calls appropriate functions
//start/pause button
startPauseButton.addEventListener("click", function () {
  if (timerPaused) {
    startTimer();
    timerPaused = !timerPaused;
    startPauseButton.textContent = "PAUSE";
  } else {
    pauseTimer();
    timerPaused = !timerPaused;
    startPauseButton.textContent = "START";
  }
});

//settings button, pulls up settings menu
pomodoroSettingsBtn.addEventListener("click", function () {
  pomodoroSettingsDisplay.classList.add("settings-show");
});

//X button in settings menu
closePomodoroSettingsBtn.addEventListener("click", function () {
  pomodoroSettingsDisplay.classList.remove("settings-show");
});

//reset and update buttons
resetSessionsBtn.addEventListener("click", resetSession);
updateSettingsBtn.addEventListener("click", updateSessionsVar);
