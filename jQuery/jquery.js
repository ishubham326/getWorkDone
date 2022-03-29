// Todolist

// Countdown
//use for reference https://stackoverflow.com/questions/9335140/how-to-countdown-to-a-date
//time variables
let countdownValues = $(".countdown-values");
let countdownSeconds = 1000;
let countdownMinutes = countdownSeconds * 60;
let countdownHours = countdownMinutes * 60;
let countdownDays = countdownHours * 24;

//restoring from local storage if there is anything there
let countdownDate = window.localStorage.getItem("countdownDate")
  ? new Date(window.localStorage.getItem("countdownDate"))
  : new Date("01/01/2023");

window.localStorage.getItem("countdownTitle")
  ? $("#countdown-to").text(window.localStorage.getItem("countdownTitle"))
  : $("#countdown-to").text("Your next venture");

$("#countdown-settings-button").on("click", function () {
  $("#countdown-settings-menu").toggleClass("settings-show");
});
$("#close-countdown-settings").on("click", function () {
  $("#countdown-settings-menu").toggleClass("settings-show");
});
$("#date").text(countdownDate.toDateString());

//using jQuery library datePicker, allows for a calendar view for input
$(function () {
  $("#date-picker").datepicker({
    changeMonth: true,
    changeYear: true,
    minDate: 0,
  });
});

//function that starts the interval
//goes through and gets an updated time between now and the countdown date
//splits it into days, hours, mins, seconds and updates displays appropriately
function startCountdown() {
  let countdownTimer = setInterval(() => {
    let rightNow = new Date();
    let timeLeft = countdownDate - rightNow;
    if (timeLeft < 0) {
      clearInterval(countdownTimer);
      return;
    }
    let daysLeft = Math.floor(timeLeft / countdownDays);
    let hoursLeft = Math.floor((timeLeft % countdownDays) / countdownHours);
    let minutesLeft = Math.floor(
      (timeLeft % countdownHours) / countdownMinutes
    );
    let secondsLeft = Math.floor(
      (timeLeft % countdownMinutes) / countdownSeconds
    );

    $("#date-timer").text(
      `${daysLeft} ${hoursLeft.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })} 
      ${minutesLeft.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })} ${secondsLeft.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`
    );
  }, 1000);
}

//when the form is submitted, the appropriate fields
//are assigned to each variables and the displays are updated
$("#countdown-form").on("submit", function (e) {
  e.preventDefault();
  countdownDate = new Date(countdownValues[1].value);
  window.localStorage.setItem("countdownDate", countdownDate);
  window.localStorage.setItem("countdownTitle", countdownValues[0].value);
  $("#date").text(countdownDate.toDateString());
  $("#countdown-to").text(countdownValues[0].value);
  startCountdown();
  $("#countdown-settings-menu").toggleClass("settings-show");
  countdownValues[0].value = "";
  countdownValues[1].value = "";
});
startCountdown();
//cat-jump
