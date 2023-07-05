const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, generateRandomString, getUserByEmail,getQuizByPublic, getUserById } = require("../database_placeholders/users");

// Get route for publicQuizzes
router.get('/', async ( req, res) => {

  // getQuizByPublic().then((quizs) => {
  //   getUserById(req.session.userID).then((user) =>{ // Get the user from the db
  //     // pass the values to the webpage and display it
  //     const templateVars = {users: users, user: user, quizzes: quizs};
  //     res.render('publicQuizzes', templateVars);
  //   });
  // });

  const quizzes = await getQuizByPublic();
  const user = await getUserById(req.session.userID)// Get the user from the db

  const templateVars = {users: users, user: user, quizzes: quizzes};
  res.render('publicQuizzes', templateVars);
});

module.exports = router;
