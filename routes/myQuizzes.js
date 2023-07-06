const express = require('express');
const router  = express.Router();

// User get queries
const { getUserById } = require("../db/queries/userGetQueries");
// Quiz get queries
const { getMyQuizzesByID, getFavQuizzesByUserId, getQuizAvgRatingById } = require("../db/queries/quizGetQueries");
// Misc get queries
const { getFavourite, getResultByUserAndQuiz } = require("../db/queries/miscGetQueries");
// Misc update queries
const { updateFavourite, updateQuizRating  } = require("../db/queries/miscUpdateQueries");


// get route for MyQuizzes page
router.get('/', async (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  const user = await getUserById(userID); // get the user from the db

  const myQuizzes = await getMyQuizzesByID(userID); // get my quizzes from db
  for(const quiz of myQuizzes){
    let average = await getQuizAvgRatingById(quiz.id);
    quiz.rating = parseFloat(average.rating);
    if(quiz.rating){
      await updateQuizRating(quiz.id, quiz.rating);
    }

    let result = await getResultByUserAndQuiz(userID, quiz.id);
    if(result){
      quiz.scoreString = `${result.highest_score} / ${result.out_of}`;
    } else {
      quiz.scoreString = " ";
    }
  }

  const favQuizzes = await getFavQuizzesByUserId(userID); // get favourite quizzes from the db
  for(const quiz of favQuizzes){
    let average = await getQuizAvgRatingById(quiz.id);
    quiz.rating = parseFloat(average.rating);
    if(quiz.rating){
      await updateQuizRating(quiz.id, quiz.rating);
    }
  }


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
