const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, generateRandomString, getUserByEmail, getUserById, getMyQuizzesByID, getFavQuizzesByUserId } = require("../database_placeholders/users");

const { addResultToDatabase } = require("../db/queries/postQuizToDatabase");

// get route for MyQuizzes page
router.get('/', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  // pass the values to the webpage and display it
  getMyQuizzesByID(userID).then((myQuizzes) => {
    getFavQuizzesByUserId(userID).then((favQuizzes) => {
      getUserById(userID).then((user) => {
        const templateVars = {user: user, quizzes: myQuizzes, favourites: favQuizzes};
        res.render('myQuizzes', templateVars);
      })
    });
  })
});



module.exports = router;
