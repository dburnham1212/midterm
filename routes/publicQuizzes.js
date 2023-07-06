const express = require('express');
const router  = express.Router();

// User get queries
const { getUserById } = require("../db/queries/userGetQueries");
// Quiz get queries
const { getQuizzesByPublic, getQuizAvgRatingById  } = require("../db/queries/quizGetQueries");
// Misc update queries
const { updateQuizRating  } = require("../db/queries/miscUpdateQueries");

// Get route for publicQuizzes
router.get('/', async ( req, res) => {
  // Getting files from the db
  const user = await getUserById(req.session.userID)// Get the user from the db
  const quizzes = await getQuizzesByPublic(); // Get pulblic quizzes from the db

  // Cycle through the quizzes
  for(const quiz of quizzes){
    let average = await getQuizAvgRatingById(quiz.id); // Get the average rating of the quiz from db
    quiz.rating = parseFloat(average.rating);
    if(quiz.rating){ // Set the quiz rating to be exual to the average
      await updateQuizRating(quiz.id, quiz.rating);
    }
  }

  // Pass the variables to the page and display them
  const templateVars = { user: user, quizzes: quizzes};
  res.render('publicQuizzes', templateVars);
});

module.exports = router;
