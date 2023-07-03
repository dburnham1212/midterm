const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/', (req, res) => {
  const userID = req.session.userID;
  const user = users[userID];
  let myQuizzes = [];
  let favQuizzes = [];
  let myQuizzesResults = [];

  for(const quiz of quizzes) {
    let ratingCount = 0;
    let totalRating = 0;
    for(const result of results) {
      if(result.quiz_id === quiz.id) {
        totalRating += result.rating;
        ratingCount ++;
      }
    }
    if(ratingCount > 0) {
      quiz.rating = totalRating/ratingCount;
    } else {
      quiz.rating = 1;
    }

    if(quiz.user_id === user.id){
      myQuizzes.push(quiz);
    }
    for(const result of results) {
      if(result.quiz_id === quiz.id && userID === result.user_id && result.favourited) {
        favQuizzes.push(quiz);
      }
    }
  }

  const templateVars = {user: user, quizzes: myQuizzes, favourites: favQuizzes, results: results};
  res.render('myQuizzes', templateVars);
});



module.exports = router;
