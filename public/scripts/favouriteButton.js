// const { getFavourite } = require("../database_placeholders/users");


// $(() => {
//     $('.favourite').on('click', function(event) {
//       console.log('hi');
//       event.preventDefault();
//       // let array = JSON.parse($(this).val());
//       console.log($(this).val());
//       //userID, quizID
//       let userID = array[0];
//       let quizID = array[1];
//       getFavourite(userID, quizID);

//      })
//  });


// const getFavourite = function (quizID, userID) {
//   return db
//   .query(`Update
//   SET is_favorite = true
//   WHERE user_id = $1
//   AND quiz_id = $2`, [quizID, userID]);
// };

const loadFavourite = (val) => {
  $.ajax({
    method : "POST",
    url:'/myQuizzes/favourites',
    data: val });
};




$(document).ready(function() {

  $('.favourite').on('click', function(event) {
    event.preventDefault();
    console.log($(this).data("quiz"));
    console.log($(this).val());
    
    // loadFavourite($(this).val());
  });

//
});

 //
// $ajax.post to backend
