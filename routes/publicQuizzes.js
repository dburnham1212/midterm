const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

// Get route for publicQuizzes
router.get('/', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  let publicQuizzes = []; //Set up list of quizzes to display

  // cycle through all of the quizzes and add the ones to display to the list
  for (const quiz of quizzes) {
    if(quiz.public){
      publicQuizzes.push(quiz)
    }
  }

  // pass the values to the webpage and display it
  const templateVars = {users: users, user: users[userID], quizzes: publicQuizzes};
  res.render('publicQuizzes', templateVars);
});

module.exports = router;
