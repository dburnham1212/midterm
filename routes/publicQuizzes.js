const express = require('express');
const router  = express.Router();

const { users, public_quizzes, getUserByEmail } = require("../database_placeholders/users");

router.get('/', (req, res) => {
  const userID = req.session.userID;

  const templateVars = {users: users, user: users[userID], public_quizzes: public_quizzes};
  res.render('publicQuizzes', templateVars);
});

module.exports = router;
