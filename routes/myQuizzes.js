const express = require('express');
const router  = express.Router();

const { getUserByEmail, getUserById, getMyQuizzesByID, getFavQuizzesByUserId, getFavourite, updateFavourite } = require("../database_placeholders/users");

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




router.post('/:id/favourites', async (req, res) => {
  console.log("========");
  console.log(res.body);
  // console.log(Object.keys(req.body));
  let keys = Object.keys(req.body).toString().split(",");
  let userID = Number(keys[0]);
  let quizID = Number(keys[1]);
  console.log("========");
  const favourite = await getFavourite(userID, quizID);
  await updateFavourite(userID, quizID, !favourite.is_favorite);



  res.redirect('/myQuizzes');
});




module.exports = router;
