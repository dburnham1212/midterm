/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const {users, quizzes, questions, answers, results, generateRandomString, getUserByEmail, getIdByEmail } = require("../database_placeholders/users");

// const { getUsers, getUserByEmail } = require("../db/queries/users.js");
// // const users = getUsers();

router.get('/', (req, res) => {
  res.render('users');
});


// Simple get route that displays the login form
router.get('/login', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  // pass values into template and render it
  const templateVars = { user: users[userID] }
  res.render('login', templateVars);
})

// Simple get route that displays the register form
router.get('/register', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookies
  // pass values into template and render it
  const templateVars = { user: users[userID]}
  res.render('register', templateVars);
});



// Post route for when a user has logged in
router.post('/login', (req, res) => {
  //  userID: { id:'userID', email: 'test@gmail.com', password:'password'}
//users['userID'] = {id:'userID', email:'test@gmail.com', password:'password'}
  const email = req.body.email; // Get the email from the template
  const password = req.body.password;
  const rePassword = req.body.rePassword;
  getUserByEmail(email).then((user) => { // find the user from the database

    if(user){ // if the user exists
      req.session.userID = user.id; // set the cookie based off of the user that we found
      console.log('===========');
      console.log(user.id);
      console.log('===========');
      res.redirect("/publicQuizzes") // redirect to public quizzes
    } else {
      res.redirect('/users/login'); // redirect back to login form
    }
  });
});

router.post('/register', (req, res) => {
  const email = req.body.email; // Get the email from the template
  const password = req.body.password; // Get the password from the template
  const rePassword = req.body.rePassword;
  getUserByEmail(email).then((user) => { // Check if there is a user already in the database

    if(user){ // if we do have a user with those credentials
      res.redirect('/users/register'); // redirect to the register page
    } else { // if not create a new user and add them to the db
      let newID = generateRandomString(6);
      //function that INSERTS getUSEROBJECT into Database
      users[newID] = { id: newID, email: email, password: password } // creating a new user and adding to db

      req.session.userID = newID;
      res.redirect('/publicQuizzes');
    }

  });
});

// Simple post logou route that clears the cookie and redirects to login page
router.post("/logout", (req, res) => {
  console.log("logout");
  req.session = null;
  res.redirect(`/users/login`);
});

module.exports = router;
