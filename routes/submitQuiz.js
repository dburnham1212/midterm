const express = require('express');
const router  = express.Router();

const { users, quizzes, favourites, questions, answers, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/:id', (req, res) => {
  const userID = req.session.userID;
  console.log(req.params.id);
  let currentQuiz;
  for(const quiz of quizzes){
    if(quiz.id === req.params.id){
      currentQuiz=quiz;
    }
  }
  console.log(req.body);
  for(const question of questions){
    if(currentQuiz.id === question.quiz_id){
      console.log(req.body[question.quiz_id]);
    }
  }
  const templateVars = {user: users[userID], quiz: currentQuiz };
  res.render('submitQuiz', templateVars);
});

router.post('/:id', (req, res) => {
  console.log(req.body);
  res.redirect(`/submitQuiz/${req.params.id}`);
});

module.exports = router;
