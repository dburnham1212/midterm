const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, generateRandomString, getUserByEmail, getUserById } = require("../database_placeholders/users");

const { addResultToDatabase } = require("../db/queries/postQuizToDatabase");


// get route for quiz submission
router.get('/:id', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  let currentQuiz;
  // cycle through the quizzes and find the one that maches the url provided
  for(const quiz of quizzes){
    if(quiz.id === req.params.id){
      currentQuiz=quiz;
    }
  }
  let currentResult;
  // cycle through results and find the one that matches the quiz that was selected
  for(const result of results) {
    if(result.quiz_id === req.params.id && userID == result.user_id){
      currentResult=result;
    }
  }

  // pass the values to the webpage and display it
  getUserById(userID).then((user) =>{ // Get the user from the db
    const templateVars = {user: user, quiz: currentQuiz, result: currentResult };
    res.render('submitQuiz', templateVars);
  });
});

// Post route for quiz submission
router.post('/:id', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  let currentQuiz;
  let answerCount = 0;
  let correctCount = 0;

  // cycle through quizzes and find the one that matches the id provided by the url
  for(const quiz of quizzes){
    if(quiz.id === req.params.id){
      currentQuiz=quiz;
    }
  }
  // search through questions to determine if the answers to the questions are correct or not
  for(const question of questions){
    if(question.quiz_id === currentQuiz.id) {
      answerCount ++; // update the number of answers
      for(const answer of answers){ // cycle through the answers and see which ones are correct when compared to the answers given
        if(answer.id === req.body[question.id] && answer.is_correct) {
          correctCount++; // update correct count to let us know how many answers were correct
        }
      }
    }
  }
  // First check if the current quiz exists or not
  if(currentQuiz){
    let resultFound = false;
    for(let result of results){ // cycle through results and find the one that is associated with this user and quiz
      if(result.quiz_id === currentQuiz.id && userID == result.user_id){
        resultFound = true;
        // if the correct count is greater than what we currently have stored in the db then update the highest score as well as the last score
        if(result.highest_score < correctCount) {
          result.highest_score = correctCount;
          result.last_score = correctCount;
        } else { // otherwise update the last score
          result.last_score = correctCount;
        }
        result.out_of = answerCount; // set result out of to the number of answers
      }
    }
    // if there isnt a result for the quiz that we have selected
    if(!resultFound){
      // create a new result object based off of the values and push it into the database

    //   addResultToDatabase(result, result.favourited);
    // } else {
    //   addResultToDatabase(result);
      let currentResult = {
        quiz_id: currentQuiz.id,
        user_id: userID,
        highest_score: correctCount,
        last_score: correctCount,
        out_of: answerCount,
        favourited: false,
        rating: 0
      }

      addResultToDatabase(currentResult)
      results.push(currentResult)
    }
  }

  // redirect to submit quiz route
  res.redirect(`/submitQuiz/${req.params.id}`);
});

// post route used for ratings when a user has reviewed their results
router.post('/submitReview/:id', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  let currentQuiz;
  // cycle through quizzes and find the one that was taken
  for(const quiz of quizzes){
    if(quiz.id === req.params.id){
      currentQuiz=quiz;
    }
  }
  if(currentQuiz){ // check if we have found a quiz or not
    for(let result of results){ // cycle through results and update the result based off of the number that was selected
      if(result.quiz_id === currentQuiz.id && userID == result.user_id){
        result.rating = Number(req.body['rating']);
        if(req.body['favourite']){
          result.favourited = true;
        } else {
          result.favourited = false;
        }
      }
    }
  }

  // redirect to myquizzes page
  res.redirect(`/myQuizzes`);
});

module.exports = router;
