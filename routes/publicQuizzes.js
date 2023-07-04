const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, generateRandomString, getUserByEmail,getQuizByPublic, getUserById } = require("../database_placeholders/users");

// Get route for publicQuizzes
router.get('/', (req, res) => {
  // let publicQuizzes = []; //Set up list of quizzes to display




  //id, user_id, title, rating, public
  // cycle through all of the quizzes and add the ones to display to the list
    // for (const quiz of quizzes) {
    //   if(quiz.public){
        // publicQuizzes.push(quiz)

      // }
    // }

  getQuizByPublic().then((quizs) => {
    getUserById(req.session.userID).then((user) =>{ // Get the user from the db
      // pass the values to the webpage and display it
      const templateVars = {users: users, user: user, quizzes: quizs};
      res.render('publicQuizzes', templateVars);
    });
  });
});

module.exports = router;
