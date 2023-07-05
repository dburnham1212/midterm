const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, generateRandomString, getUserByEmail, getUserById, getQuizByQuizId, getQuestionsByQuizId, getAnswersByQuizId } = require("../database_placeholders/users");


// get route used to allow a user to take a quiz
router.get('/:id', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  // Pass all of the values into the take quiz template and display the quiz
  getQuizByQuizId(req.params.id).then((quiz) => {
    getQuestionsByQuizId(req.params.id).then(questions => {
      getAnswersByQuizId(req.params.id).then(answers => {
        getUserById(userID).then((user) => { // Get the user from the db
          const templateVars = {user: user, questions: questions, answers: answers, quizID: req.params.id, quiz: quiz };
          res.render('takeQuiz', templateVars);
        });
      })
    })
  })
});

module.exports = router;
