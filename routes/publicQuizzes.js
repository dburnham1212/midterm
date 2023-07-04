const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, generateRandomString, getUserByEmail,getQuizByPublic, getUserById } = require("../database_placeholders/users");

// Get route for publicQuizzes
router.get('/', (req, res) => {

  getQuizByPublic().then((quizs) => {
    getUserById(req.session.userID).then((user) =>{ // Get the user from the db
      // pass the values to the webpage and display it
      const templateVars = {users: users, user: user, quizzes: quizs};
      res.render('publicQuizzes', templateVars);
    });
  });
});

module.exports = router;
