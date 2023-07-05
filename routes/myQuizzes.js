const express = require('express');
const router  = express.Router();

const { getUserByEmail, getUserById, getMyQuizzesByID, getFavQuizzesByUserId } = require("../database_placeholders/users");

const { addResultToDatabase } = require("../db/queries/postQuizToDatabase");

// get route for MyQuizzes page
router.get('/', async (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  const user = await getUserById(userID); // get the user from the db

  const myQuizzes = await getMyQuizzesByID(userID); // get my quizzes from db
  const favQuizzes = await getFavQuizzesByUserId(userID); // get favourite quizzes from the db

  // pass the values to the webpage and display it
  const templateVars = {user: user, quizzes: myQuizzes, favourites: favQuizzes};
  res.render('myQuizzes', templateVars);
});



module.exports = router;
