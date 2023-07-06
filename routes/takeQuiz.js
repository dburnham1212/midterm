const express = require('express');
const router = express.Router();

// User get queries
const { getUserById } = require("../db/queries/userGetQueries");
// Quiz get queries
const { getQuizByQuizId } = require("../db/queries/quizGetQueries");
// Question get queries
const { getQuestionsByQuizId } = require("../db/queries/questionGetQueries");
// Answer get queries
const { getAnswersByQuizId } = require("../db/queries/miscGetQueries");


// get route used to allow a user to take a quiz
router.get('/:id', async (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  // Pass all of the values into the take quiz template and display the quiz
  const user = getUserById(userID); // Get the user from the db

  const quiz = await getQuizByQuizId(req.params.id);
  const questions = await getQuestionsByQuizId(req.params.id);
  const answers = await getAnswersByQuizId(req.params.id);

  const templateVars = { user: user, questions: questions, answers: answers, quizID: req.params.id, quiz: quiz };
  res.render('takeQuiz', templateVars);
});

module.exports = router;
