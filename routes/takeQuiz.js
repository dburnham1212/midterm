const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, generateRandomString, getUserByEmail, getUserById, getEntireQuiz } = require("../database_placeholders/users");

// get route used to allow a user to take a quiz
router.get('/:id', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  let currentQuiz; // Create the current quiz object
  let quizQuestions = []; // Create an array to store questions for the given quiz
  let quizAnswers = []; // Create an array to store the answers for the given quiz

  // cycle through the quizzes and find the one based off of the url given
  for(const quiz of quizzes){
    if(quiz.id === req.params.id){
      currentQuiz = quiz;
    }
  }

  // cycle through questions and find the questions for the current quiz then push them to the list
  for(const question of questions) {
    if(question.quiz_id === req.params.id){
      quizQuestions.push(question);
    }

    // cycle through answers and find the ones associated with the current question and push them to the list
    for(const answer of answers){
      if(answer.question_id === question.id) {
        quizAnswers.push(answer);
      }
    }
  }

  // Pass all of the values into the take quiz template and display the quiz
  getEntireQuiz(req.params.id).then((quiz) => {
    getUserById(userID).then((user) => { // Get the user from the db
        const templateVars = {user: user, questions: quizQuestions, answers: quizAnswers, quizID: req.params.id, quiz: quiz };
        res.render('takeQuiz', templateVars);
    });
  })
});

module.exports = router;
