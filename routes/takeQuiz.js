const express = require('express');
const router  = express.Router();

const { users, quizzes, favourites, questions, answers, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/:id', (req, res) => {
  const userID = req.session.userID;
  console.log(req.params.id);
  let quizQuestions = [];
  for(const question of questions) {
    if(question.quiz_id === req.params.id){
      quizQuestions.push(question);
    }
  }
  const templateVars = {user: users[userID], quizzes: quizzes, questions: quizQuestions};
  res.render('takeQuiz', templateVars);
});

module.exports = router;
