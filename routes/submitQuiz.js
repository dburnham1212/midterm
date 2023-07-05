const express = require('express');
const router  = express.Router();

const { getUserByEmail, getUserById, getQuizByQuizId, getQuestionsByQuizId, getAnswersByQuizId, getResultByUserAndQuiz } = require("../database_placeholders/users");

const { addResultToDatabase, updateResult } = require("../db/queries/postQuizToDatabase");

// get route for quiz submission
router.get('/:id', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  getQuizByQuizId(req.params.id).then(currentQuiz => {
    getResultByUserAndQuiz(userID, currentQuiz.id).then((result) => {
      // pass the values to the webpage and display it
      getUserById(userID).then((user) =>{ // Get the user from the db
        const templateVars = {user: user, quiz: currentQuiz, result: result };
        res.render('submitQuiz', templateVars);
      });
    })
  });
});

// Post route for quiz submission
router.post('/:id', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  // let currentQuiz;
   let answerCount = 0;
  let correctCount = 0;

  getQuizByQuizId(req.params.id).then(currentQuiz => {
    // search through questions to determine if the answers to the questions are correct or not
    getQuestionsByQuizId(req.params.id).then(questions => {
      getAnswersByQuizId(req.params.id).then(answers => {
        getResultByUserAndQuiz(userID, currentQuiz.id).then((result) => {
          console.log(result)
          console.log("=================--")
          for(const question of questions){
            // if(question.quiz_id === currentQuiz.id) {
              answerCount ++; // update the number of answers
              for(const answer of answers){ // cycle through the answers and see which ones are correct when compared to the answers given
                if(answer.id === req.body[question.id] && answer.is_correct) {
                  correctCount++; // update correct count to let us know how many answers were correct
                }
              }
            // }
          }
          // First check if the current quiz exists or not
          if(currentQuiz){
                if(result){
                  // if the correct count is greater than what we currently have stored in the db then update the highest score as well as the last score
                  if(result.highest_score < correctCount) {
                    result.highest_score = correctCount;
                    result.last_score = correctCount;
                  } else { // otherwise update the last score
                    result.last_score = correctCount;
                  }
                  result.out_of = answerCount; // set result out of to the number of answers
                  updateResult(result);
                }

            // if there isnt a result for the quiz that we have selected
            else {
            // if(!resultFound){
              // create a new result object based off of the values and push it into the database

            //   addResultToDatabase(result, result.favourited);
            // } else {
              console.log("here2")
              let currentResult = {
                quiz_id: currentQuiz.id,
                user_id: userID,
                highest_score: correctCount,
                last_score: correctCount,
                out_of: answerCount,
                favourited: false,
                rating: 0
              }
              console.log("=================")
               console.log(currentResult);
              addResultToDatabase(currentResult)
              // results.push(currentResult)
              // console.log(results);
            }
          }

          // redirect to submit quiz route
          res.redirect(`/submitQuiz/${req.params.id}`);
        })
      })
    })
  })
});

// post route used for ratings when a user has reviewed their results
router.post('/submitReview/:id', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  // let currentQuiz;
  // cycle through quizzes and find the one that was taken
  getQuizByQuizId(req.params.id).then(currentQuiz => {
    getResultByUserAndQuiz(userID, currentQuiz.id).then((result) => {
      if(currentQuiz){ // check if we have found a quiz or not
        //for(let result of results){ // cycle through results and update the result based off of the number that was selected
          //if(result.quiz_id === currentQuiz.id && userID == result.user_id){
            result.rating = Number(req.body['rating']);
            if(req.body['favourite']){
              result.is_favorite = true;
              //addResultToDatabase(result);
            } else {
              result.is_favorite = false;
              //addResultToDatabase(result);
            }
          }
        //}
        updateResult(result);
      //}

      // redirect to myquizzes page
      res.redirect(`/myQuizzes`);
    });
  });
});

module.exports = router;
