const express = require('express');
const router = express.Router();

// User get queries
const { getUserById } = require("../db/queries/userGetQueries");
// Quiz get queries
const { getQuizByQuizId } = require("../db/queries/quizGetQueries");
// Question get queries
const { getQuestionsByQuizId } = require("../db/queries/questionGetQueries");
// Misc get queries
const { getResultByUserAndQuiz, getFavourite, getCorrectAnswersByQuizId } = require("../db/queries/miscGetQueries");
// Misc Add queries
const { addToFavourites, addToResults } = require("../db/queries/miscAddQueries");
// Misc update queries
const { updateResult } = require("../db/queries/miscUpdateQueries");
// Misc delete queries
const { removeFromFavourites } = require("../db/queries/miscDeleteQueries");



// get route for quiz submission
router.get('/:id', async(req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  // Get objects from the db
  const user = await getUserById(userID); // Get the user from the db
  const currentQuiz = await getQuizByQuizId(req.params.id);
  const result = await getResultByUserAndQuiz(userID, currentQuiz.id);

  // pass the values to the webpage and display it
  const templateVars = { user: user, quiz: currentQuiz, result: result };
  res.render('submitQuiz', templateVars);
});

// Post route for quiz submission
router.post('/:id', async(req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  // let currentQuiz;
  let answerCount = 0;
  let correctCount = 0;

  const currentQuiz = await getQuizByQuizId(req.params.id);
  // search through questions to determine if the answers to the questions are correct or not
  const questions = await getQuestionsByQuizId(req.params.id);
  const answers = await getCorrectAnswersByQuizId(req.params.id);
  for (const question of questions) {
    answerCount++; // update the number of answers
    for (const answer of answers) { // cycle through the answers and see which ones are correct when compared to the answers given

      if (answer.id === Number(req.body[question.id])) {
        correctCount++; // update correct count to let us know how many answers were correct
      }
    }
  }
  console.log(correctCount);
  console.log(answerCount);
  const result = await getResultByUserAndQuiz(userID, currentQuiz.id);
  // First check if the current quiz exists or not
  if (currentQuiz) {
    if (result) {
      // if the correct count is greater than what we currently have stored in the db then update the highest score as well as the last score
      if (result.highest_score < correctCount) {
        result.highest_score = correctCount;
        result.last_score = correctCount;
      } else { // otherwise update the last score
        result.last_score = correctCount;
      }
      result.out_of = answerCount; // set result out of to the number of answers
      await updateResult(result);
    }

    // if there isnt a result for the quiz that we have selected
    else {
      let currentResult = {
        quiz_id: currentQuiz.id,
        user_id: userID,
        highest_score: correctCount,
        last_score: correctCount,
        out_of: answerCount,
        rating: 0
      };
      await addToResults(currentResult);
    }
  }


  // redirect to submit quiz route
  res.redirect(`/submitQuiz/${req.params.id}`);
});

// post route used for ratings when a user has reviewed their results
router.post('/submitReview/:id', async(req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  // let currentQuiz;
  // cycle through quizzes and find the one that was taken
  const currentQuiz = await getQuizByQuizId(req.params.id);
  const result = await getResultByUserAndQuiz(userID, currentQuiz.id);
  if (currentQuiz) { // check if we have found a quiz or not
    result.rating = Number(req.body['rating']);
    const favourite = await getFavourite(userID, currentQuiz.id);
    if (req.body['favourite']) {
      if (!favourite) {
        await addToFavourites(userID, currentQuiz.id);
      }
    } else {
      if (favourite) {
        await removeFromFavourites(userID, currentQuiz.id);
      }
    }
  }
  updateResult(result);

  // redirect to myquizzes page
  res.redirect(`/myQuizzes`);
});

// create a sharable link t
router.post('/submitReview/:id', async(req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  // let currentQuiz;
  // cycle through quizzes and find the one that was taken
  const currentQuiz = await getQuizByQuizId(req.params.id);
  const result = await getResultByUserAndQuiz(userID, currentQuiz.id);
  if (currentQuiz) { // check if we have found a quiz or not
    result.rating = Number(req.body['rating']);
    const favourite = await getFavourite(userID, currentQuiz.id);
    if (req.body['favourite']) {
      if (!favourite) {
        await addToFavourites(userID, currentQuiz.id);
      }
    } else {
      if (favourite) {
        await removeFromFavourites(userID, currentQuiz.id);
      }
    }
  }
  updateResult(result);

  // redirect to myquizzes page
  res.redirect(`/myQuizzes`);
});

module.exports = router;
