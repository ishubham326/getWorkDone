//Bored api
//https://www.freecodecamp.org/news/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa/
let activity = "Recount the alphabets backwards";
$(document).ready(() => {
  const URL = "http://www.boredapi.com/api/activity/";
  $.ajax({
    url: URL,
    type: "GET",
    success: function (data) {
      console.log(data.activity);
      $("#activity").text(data.activity);
    },
    error: function (error) {
      console.log(error);
    },
  });
});
