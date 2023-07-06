const express = require('express');
const router  = express.Router();

// User get queries
const { getUserById } = require("../db/queries/userGetQueries");

// Get route for publicQuizzes
router.get('/:error', async ( req, res) => {
  // Getting files from the db
  const user = await getUserById(req.session.userID)// Get the user from the db

  // Pass the variables to the page and display them
  const templateVars = { user: user, error: req.params.error};
  res.render('error', templateVars);
});

module.exports = router;
