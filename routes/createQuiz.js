const express = require('express');
const router  = express.Router();

const { users, public_quizzes, getUserByEmail } = require("../database_placeholders/users");

router.get('/', (req, res) => {
  const userID = req.session.userID;

  const templateVars = {user: users[userID]};
  res.render('createQuiz', templateVars);
});

module.exports = router;
