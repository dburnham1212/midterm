const express = require('express');
const router  = express.Router();

const { users, quizzes, favourites, questions, answers, results, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/', (req, res) => {
  const userID = req.session.userID;

  const templateVars = {user: users[userID]};
  res.render('createQuiz', templateVars);
});

router.post('/', (req, res) => {
  const userID = req.session.userID;
  console.log(req.body)
  let questionCounter = 1;

  let quizID = generateRandomString(6);
  if(req.body[`${questionCounter}`]) {
    quizzes.push(
      {
        id: quizID,
        user_id: userID,
        title: req.body[`quiz-title`],
        rating: 4,
        public: true
      }
    );
  }
  while(req.body[`${questionCounter}`] ) {
    let questionID = generateRandomString(6);
    questions.push(
      {
        id: questionID,
        quiz_id: quizID,
        text: req.body[`${questionCounter}`],
        question_number: 2,
      }
    );

    let correct = Number(req.body[`answer${questionCounter}`])
    let currentAnswers = req.body[`input${questionCounter}`];
    for(let i = 0; i < currentAnswers.length; i++) {
      let answerID = generateRandomString(10);
      let currentAnswer = {
        id: answerID,
        question_id: questionID,
        text: currentAnswers[i],
        is_correct: false
      }
      if(correct - 1 === i){
        currentAnswer.is_correct = true;
      }
      answers.push(currentAnswer);
    }
    questionCounter++;
  }
  console.log(quizzes);
  res.redirect('/myQuizzes');
});

module.exports = router;
