const express = require('express');
const router  = express.Router();

const { users, quizzes, favourites, questions, answers, results, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/:id', (req, res) => {
  const userID = req.session.userID;
  let currentQuiz;
  for(const quiz of quizzes){
    if(quiz.id === req.params.id){
      currentQuiz=quiz;
    }
  }
  let currentResult;
  for(const result of results) {
    if(result.quiz_id === req.params.id && userID == result.user_id){
      currentResult=result;
    }
  }
  console.log(currentResult);
  const templateVars = {user: users[userID], quiz: currentQuiz, result: currentResult };
  res.render('submitQuiz', templateVars);
});

router.post('/:id', (req, res) => {
  const userID = req.session.userID;

  let currentQuiz;
  let answerCount = 0;
  let correctCount = 0;

  for(const quiz of quizzes){
    if(quiz.id === req.params.id){
      currentQuiz=quiz;
    }
  }
  for(const question of questions){
    if(question.quiz_id === currentQuiz.id) {
      answerCount ++;
      for(const answer of answers){
        if(answer.id === req.body[question.id] && answer.is_correct) {
          correctCount++;
        }
      }
    }
  }
  if(currentQuiz){
    let resultFound = false
    for(let result of results){
      if(result.quiz_id === currentQuiz.id && userID == result.user_id){
        resultFound = true;
        result.score = correctCount;
        result.out_of = answerCount;
      }
    }
    if(!resultFound){
      results.push({
        quiz_id: currentQuiz.id,
        user_id: userID,
        score: correctCount,
        out_of: answerCount
      })
    }
  }
  console.log(correctCount, answerCount);

  res.redirect(`/submitQuiz/${req.params.id}`);
});

module.exports = router;
