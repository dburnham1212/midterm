const express = require('express');
const router = express.Router();

// User get queries
const { getUserById } = require("../db/queries/userGetQueries");
// Quiz get queries
const { getQuizByQuizId } = require("../db/queries/quizGetQueries");
// Misc get queries
const { getResultByUserAndQuiz} = require("../db/queries/miscGetQueries");



// get route for quiz submission
router.get('/:id/:userID', async(req, res) => {

  // Get objects from the db
  const user = await getUserById(req.params.userID); // Get the user from the db
  const currentQuiz = await getQuizByQuizId(req.params.id);
  const result = await getResultByUserAndQuiz(req.params.userID, currentQuiz.id);

  // pass the values to the webpage and display it
  const templateVars = { user: user, quiz: currentQuiz, result: result };
  res.render('shareResults', templateVars);
});

module.exports = router;
