// const { getFavourite } = require("../database_placeholders/users");


$(() => {
    $('.favourite').on('click', function(event) {
      console.log('hi');
      event.preventDefault();
      // let array = JSON.parse($(this).val());
      console.log($(this).val());
      //userID, quizID
      let userID = array[0];
      let quizID = array[1];
      getFavourite(userID, quizID);

     })
 });

 $.ajax("/favourites", { method: "POST" }).then((res) => {

  }, 5);
});

$(document).ready(function() {

  loadTweets();

  $('.favourite').on('click', function(event) {
    event.preventDefault();
    sendPostToBackend($(this).serialize());
  });

//
});

 //
// $ajax.post to backend
