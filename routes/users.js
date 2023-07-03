/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, getUserByEmail, generateRandomString } = require("../database_placeholders/users");

router.get('/', (req, res) => {
  res.render('users');
});

router.get('/login', (req, res) => {
  const userID = req.session.userID;

  const templateVars = {user: users[userID]}
  res.render('login.ejs', templateVars);
})

router.get('/register', (req, res) => {
  const userID = req.session.userID;

  const templateVars = {user: users[userID]}
  res.render('register', templateVars);
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const rePassword = req.body.rePassword;
  const user = getUserByEmail(email, users);
  if(user){
    req.session.userID = user.id;
    res.redirect("/publicQuizzes")
  } else {
    res.redirect('/users/login');
  }
});

router.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const rePassword = req.body.rePassword;
  console.log(req.body.email);
  console.log(req.body.password);
  const user = getUserByEmail(email, users);
  if(user){
    res.redirect('/users/register');
  } else {
    let newID = generateRandomString(6);
    users[newID] = { id: newID, email: email, password: password }
    req.session.userID = newID;
    res.redirect('/publicQuizzes');
  }

});

router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect(`/users/login`);
});

module.exports = router;
