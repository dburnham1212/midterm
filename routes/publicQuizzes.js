const express = require('express');
const router  = express.Router();

const { getQuizzesByPublic, getQuizAvgRatingById  } = require("../db/queries/quizGetQueries");

const { getUserById } = require("../db/queries/userGetQueries");

const { addResultToDatabase, updateQuizRating } = require("../db/queries/postQuizToDatabase");

// Get route for publicQuizzes
router.get('/', async ( req, res) => {

  const user = await getUserById(req.session.userID)// Get the user from the db
  const quizzes = await getQuizzesByPublic();


  for(const quiz of quizzes){
    let average = await getQuizAvgRatingById(quiz.id);
    quiz.rating = parseFloat(average.rating);
    if(quiz.rating){
      await updateQuizRating(quiz.id, quiz.rating);
    }
  }

  const templateVars = { user: user, quizzes: quizzes};
  res.render('publicQuizzes', templateVars);
});

module.exports = router;
