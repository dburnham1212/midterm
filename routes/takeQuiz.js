const express = require('express');
const router  = express.Router();

const { users, quizzes, favourites, questions, answers, results,  getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/:id', (req, res) => {
  const userID = req.session.userID;
  console.log(req.params.id);
  let quizQuestions = [];
  let quizAnswers = [];
  for(const question of questions) {
    if(question.quiz_id === req.params.id){
      quizQuestions.push(question);
    }
    for(const answer of answers){
      if(answer.question_id === question.id) {
        quizAnswers.push(answer);
      }
    }
  }
  const templateVars = {user: users[userID], questions: quizQuestions, answers: quizAnswers, quizID: req.params.id };
  res.render('takeQuiz', templateVars);
});

module.exports = router;
