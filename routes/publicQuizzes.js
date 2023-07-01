const express = require('express');
const router  = express.Router();

const { users, getUserByEmail } = require("../database_placeholders/users");

router.get('/', (req, res) => {
  const userID = req.session.userID;

  const templateVars = {user: users[userID]};
  res.render('publicQuizzes', templateVars);
});

module.exports = router;
