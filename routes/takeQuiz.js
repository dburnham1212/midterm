const express = require('express');
const router  = express.Router();

const { users, quizzes, favourites, questions, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/:id', (req, res) => {
  const userID = req.session.userID;

  const templateVars = {users: users};
  res.render('publicQuizzes', templateVars);
});

module.exports = router;
