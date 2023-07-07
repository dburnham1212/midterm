const express = require('express');
const router  = express.Router();

// User get queries
const { getUserById } = require("../db/queries/userGetQueries");
// Quiz get queries
const { getMyQuizzesByID, getFavQuizzesByUserId, getQuizAvgRatingById } = require("../db/queries/quizGetQueries");
// Misc get queries
const { getFavourite, getResultByUserAndQuiz } = require("../db/queries/miscGetQueries");
// Misc update queries
const { updateFavourite, updateQuizRating  } = require("../db/queries/miscUpdateQueries");


// get route for MyQuizzes page
router.get('/', async(req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  if(!userID){
    return res.redirect("/login");
  }
  const user = await getUserById(userID); // get the user from the db
  const myQuizzes = await getMyQuizzesByID(userID); // get my quizzes from db

  // Cycle through the quizzes
  for (const quiz of myQuizzes) {
    let average = await getQuizAvgRatingById(quiz.id); // Get the average based off of the results
    quiz.rating = parseFloat(average.rating);
    if (quiz.rating) { // update the rating in the quiz accordingly
      await updateQuizRating(quiz.id, quiz.rating);
    }

    let result = await getResultByUserAndQuiz(userID, quiz.id);//Get the result for the quiz and user
    if (result) { // If the result exists set the score string based off of user score
      quiz.scoreString = `${result.highest_score} / ${result.out_of}`;
    } else { // Otherwise set the string to n/a
      quiz.scoreString = "n/a";
    }
  }

  const favQuizzes = await getFavQuizzesByUserId(userID); // get favourite quizzes from the db

  // Cycle through favourite quizzes
  for (const quiz of favQuizzes) {
    let average = await getQuizAvgRatingById(quiz.id); // Get the average for the specific quiz
    quiz.rating = parseFloat(average.rating);
    if (quiz.rating) { // update the rating in the quiz accordingly
      await updateQuizRating(quiz.id, quiz.rating);
    }
  }

  // pass the values to the webpage and display it
  const templateVars = {user: user, quizzes: myQuizzes, favourites: favQuizzes};
  res.render('myQuizzes', templateVars);
});



module.exports = router;
