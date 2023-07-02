const express = require('express');
const router  = express.Router();

const { users, quizzes, favourites, questions, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/:id', (req, res) => {
  const userID = req.session.userID;
  console.log(req.params.id);
  let questions = [];
  for(const question in questions) {
    if(question.quiz_id === req.params.id){

    }
  }

  const templateVars = {user: users[userID], quizzes: quizzes};
  res.render('takeQuiz', templateVars);
});

module.exports = router;
