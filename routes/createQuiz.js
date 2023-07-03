const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

const { insertQuizsDatabase, insertquestionsDatabase, insertanswersDatabase } = require("../db/queries/postQuizToDatabase");

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
    const title = req.body[`quiz-title`];
    insertQuizsDatabase(title)
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
    const question = req.body[`${questionCounter}`];
    insertquestionsDatabase(question);
    questions.push(
      {
        id: questionID,
        quiz_id: quizID,
        text: req.body[`${questionCounter}`],
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
        is_correct: (correct - 1 === i)
      }

      insertanswersDatabase(currentAnswer)

      answers.push(currentAnswer);
    }
    questionCounter++;
  }
  res.redirect('/myQuizzes');
});

module.exports = router;
