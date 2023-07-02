const express = require('express');
const router  = express.Router();

const { users, quizzes, favourites, questions, answers, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/', (req, res) => {
  const userID = req.session.userID;
  const user = users[userID];
  let myQuizzes = [];
  let favQuizzes = [];
  for(const quiz of quizzes) {
    if(quiz.user_id === user.id){
      myQuizzes.push(quiz);
    }
    for(const favourite of favourites) {
      if(favourite.quiz_id === quiz.id && userID === favourite.user_id) {
        favQuizzes.push(quiz)
      }
    }
  }
  const templateVars = {user: user, quizzes: myQuizzes, favourites: favQuizzes};
  res.render('myQuizzes', templateVars);
});



module.exports = router;
