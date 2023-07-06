const express = require('express');
const router = express.Router();

// User get queries
const { getUserById } = require("../db/queries/userGetQueries");
// Quiz get queries
const { getQuizByTitleAndUserID, getTitleByUser } = require("../db/queries/quizGetQueries");
// Question get queries
const { getQuestionByQuizIdAndOrder } = require("../db/queries/questionGetQueries");
// Misc Add Queries
const { addToQuizs, addToQuestions, addToAnswers } = require("../db/queries/miscAddQueries");

// get route to display quiz creation form
router.get('/', async (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  // pass the values to the webpage and display it
  const user = await getUserById(userID)// Get the user from the db
  const templateVars = { user: user };
  res.render('createQuiz', templateVars);
});

// Post route for submitting a created quiz
router.post('/', async (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  //let questionCounter = 1; // Setup a value to cycle through the questions

  // if (req.body[`${questionCounter}`]) { // check if req.body has a question based off of the number provide
  //   let is_public = false;
  //   if (req.body.public) {
  //     is_public = true;
  //   }
  //   // push an object to the database with the quiz id, userId, and quiz title
  //   const newQuiz = {
  //     user_id: userID,
  //     title: req.body[`quiz-title`],
  //     rating: 4,
  //     public: is_public
  //   }

  //   //Edge case: check if the same title exist in the user
  //   const titleExits = await getTitleByUser(newQuiz)
  //   if (titleExits[0]) {
  //     if (titleExits[0].title === newQuiz.title) {

  //       return res.send("The quiz already exist");
  //     }
  //   }


  //   await addToQuizs(newQuiz);
  //   const quiz = await getQuizByTitleAndUserID(req.body[`quiz-title`], userID);

  //   while (req.body[`${questionCounter}`]) { // while we still have questions to check
  //     // push the question to the database
  //     const question = {
  //       quiz_id: quiz.id,
  //       question_text: req.body[`${questionCounter}`], // set the question text to the text found in req.body
  //       question_order: questionCounter
  //     }

  //     await addToQuestions(question);
  //     const thisQuestion = await getQuestionByQuizIdAndOrder(quiz.id, questionCounter);
  //     let correct = Number(req.body[`answer${questionCounter}`])
  //     let currentAnswers = req.body[`input${questionCounter}`];
  //     // console.log(thisQuestion);
  //     for (let i = 0; i < currentAnswers.length; i++) {
  //       let currentAnswer = { // push the answer to the database
  //         question_id: thisQuestion.id,
  //         text: currentAnswers[i],
  //         is_correct: (correct - 1 === i)
  //       };
  //       await addToAnswers(currentAnswer);
  //     }
  //     // increment question counter to set up for the next question if there is one
  //     questionCounter++;
  //   }
  // }

  let bodyKeys = Object.keys(req.body);
  console.log(bodyKeys);
  let is_public = false;
  if (req.body.public) {
    is_public = true;
  }
  // push an object to the database with the quiz id, userId, and quiz title
  const newQuiz = {
    user_id: userID,
    title: req.body[`quiz-title`],
    rating: 4,
    public: is_public
  }

  //Edge case: check if the same title exist in the user
  const titleExits = await getTitleByUser(newQuiz)
  if (titleExits[0]) {
    if (titleExits[0].title === newQuiz.title) {

      return res.send("The quiz already exist");
    }
  }

  await addToQuizs(newQuiz);
  const quiz = await getQuizByTitleAndUserID(req.body[`quiz-title`], userID);

  let questionCounter = 1;
  for (let i = 0; i < bodyKeys.length; i++) {

    if (Number(bodyKeys[i])) {
      let key = bodyKeys[i];
      console.log(key);
      // push the question to the database
      const question = {
        quiz_id: quiz.id,
        question_text: req.body[`${key}`], // set the question text to the text found in req.body
        question_order: questionCounter
      }

      await addToQuestions(question);
      const thisQuestion = await getQuestionByQuizIdAndOrder(quiz.id, questionCounter);
      let correct = Number(req.body[`answer${key}`])
      let currentAnswers = req.body[`input${key}`];

      for (let i = 0; i < currentAnswers.length; i++) {
        let currentAnswer = { // push the answer to the database
          question_id: thisQuestion.id,
          text: currentAnswers[i],
          is_correct: (correct - 1 === i)
        };
        await addToAnswers(currentAnswer);
      }
      // increment question counter to set up for the next question if there is one
      console.log("question added");

      questionCounter++;
    }
  }
  res.redirect('/myQuizzes');
});


module.exports = router;
