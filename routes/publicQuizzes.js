const express = require('express');
const router  = express.Router();

const { getUserByEmail,getQuizByPublic, getUserById } = require("../database_placeholders/users");

// Get route for publicQuizzes
router.get('/', async ( req, res) => {

  const user = await getUserById(req.session.userID)// Get the user from the db
  const quizzes = await getQuizByPublic();

  const templateVars = { user: user, quizzes: quizzes};
  res.render('publicQuizzes', templateVars);
});

module.exports = router;
