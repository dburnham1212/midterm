const express = require('express');
const router  = express.Router();

const { users, quizzes, favourites, questions, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/', (req, res) => {
  const userID = req.session.userID;

  const templateVars = {users: users, user: users[userID], quizzes: quizzes};
  res.render('publicQuizzes', templateVars);
});

module.exports = router;
