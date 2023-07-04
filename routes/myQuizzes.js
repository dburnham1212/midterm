const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, getUserByEmail, getUserById, getUser } = require("../database_placeholders/users");

const { addResultToDatabase } = require("../db/queries/postQuizToDatabase");

// get route for MyQuizzes page
router.get('/', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  const user = users[userID]; // Set the user from the table based off of the user id
  let myQuizzes = []; // Create a list of users quizzes
  let favQuizzes = []; // Create a list of favourite quizzes

  for(const quiz of quizzes) {
    // Set quiz ratings based off of an average of the overall ratings in the quiz
    let ratingCount = 0;
    let totalRating = 0;
    for(const result of results) {
      if(result.quiz_id === quiz.id) {
        totalRating += result.rating;
        ratingCount ++;
      }
    }
    // if there is a rating set the rating accordingly
    if(ratingCount > 0) {
      quiz.rating = totalRating/ratingCount;
    } else { // if not set the rating to 1
      quiz.rating = 1;
    }
    // if the quiz was created by the user (the ids match) add it to the list to display
    if(quiz.user_id === userID){
      myQuizzes.push(quiz);
    }

    // Search through results, if the result is related to the quiz and the user has favourited the quiz then add it to the list to display
    for(const result of results) {
      if(result.quiz_id === quiz.id && userID === result.user_id && result.favourited) {
        favQuizzes.push(quiz);
        addResultToDatabase(result, result.favourited);
      } else {
        addResultToDatabase(result);
      }

    }
  }

  // pass the values to the webpage and display it

  getUserById(userID).then((user) => {
    console.log(user);
    const templateVars = {user: user, quizzes: myQuizzes, favourites: favQuizzes, results: results};
    res.render('myQuizzes', templateVars);
  })
});



module.exports = router;
