/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

// User queries
const { getUserById, getUserByEmail } = require("../db/queries/userGetQueries");
// Misc add queries
const { addToUsers } = require("../db/queries/miscAddQueries");

// const { getUsers, getUserByEmail } = require("../db/queries/users.js");
// // const users = getUsers();
router.get('/', (req, res) => {
  res.render('users');
});

// Simple get route that displays the login form
router.get('/login', async (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  // pass values into template and render it
  const user = await getUserById(userID);// Get the user from the db
  const templateVars = { user: user }
  res.render('login', templateVars);
})

// Simple get route that displays the register form
router.get('/register', async (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookies
  // pass values into template and render it
  const user = await getUserById(userID);// Get the user from the db
  const templateVars = { user: user }
  res.render('register', templateVars);
});



// Post route for when a user has logged in
router.post('/login', async (req, res) => {
  //  userID: { id:'userID', email: 'test@gmail.com', password:'password'}
  //users['userID'] = {id:'userID', email:'test@gmail.com', password:'password'}
  const email = req.body.email; // Get the email from the template
  const password = req.body.password;
  const user = await getUserByEmail(email); // find the user from the database
  console.log(user);
  if (user) { // if the user exists
    req.session.userID = user.id; // set the cookie based off of the user that we found
    console.log(user.password);
    if (bcrypt.compareSync(password, user.password)) {
      return res.redirect("/publicQuizzes") // redirect to public quizzes
    } else {
      return res.send('password wrong');
    }
  } else {
    return res.send('no email exits'); // redirect back to login form
  }
});

router.post('/register', async (req, res) => {
 console.log(req.body);
  const username = req.body.username;
  let email = req.body.email; // Get the email from the template
  let password = req.body.password; // Get the password from the template
  let rePassword = req.body.rePassword;

  let user = await getUserByEmail(email)// Check if there is a user already in the database

  if (user) { // if we do have a user with those credentials
    return res.redirect('/users/register'); // redirect to the register page
  } else { // if not create a new user and add them to the db
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    let hashRePassword = bcrypt.hashSync(rePassword, salt)
    if(hashPassword === hashRePassword){
      const newUser = { username: username, email: email, password: hashPassword } // creating a new user and adding to db
      await addToUsers(newUser);
      user = await getUserByEmail(email);
      req.session.userID = user.id;
      return res.redirect('/publicQuizzes');
    } else {
      return res.send("you password doesn't match!");
    }
  }
});

// Simple post logou route that clears the cookie and redirects to login page
router.post("/logout", (req, res) => {
  console.log("logout");
  req.session = null;
  res.redirect(`/users/login`);
});

module.exports = router;
