const express = require('express');
const router = express.Router();

const { getUserByEmail, getUserById, getQuizeByTitleAndUserID, getQuestionByQuizIdAndOrder } = require("../database_placeholders/users");

const { insertQuizsDatabase, insertQuestionToDatabase, insertanswersDatabase } = require("../db/queries/postQuizToDatabase");

const { getTitleByUser } = require('../db/queries/getTitleByUser');

// get route to display quiz creation form
router.get('/', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  // pass the values to the webpage and display it
  getUserById(userID).then((user) => { // Get the user from the db
    const templateVars = { user: user };
    res.render('createQuiz', templateVars);
  });
});

// Post route for submitting a created quiz
router.post('/', async (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  let questionCounter = 1; // Setup a value to cycle through the questions
  
  if (req.body[`${questionCounter}`]) { // check if req.body has a question based off of the number provide
    
    // push an object to the database with the quiz id, userId, and quiz title
    const newQuiz = {
      user_id: userID,
      title: req.body[`quiz-title`],
      rating: 4,
      public: true
    }
    
    //Edge case: check if the same title exist in the user
    const titleExits = await getTitleByUser(newQuiz)
    if(titleExits[0].title === newQuiz.title){
      return res.send("The quiz already exist");
    }


    await insertQuizsDatabase(newQuiz);
    const quiz = await getQuizeByTitleAndUserID(req.body[`quiz-title`], userID);

    while (req.body[`${questionCounter}`]) { // while we still have questions to check
      // push the question to the database
      const question = {
        quiz_id: quiz.id,
        question_text: req.body[`${questionCounter}`], // set the question text to the text found in req.body
        question_order: questionCounter
      }

      await insertQuestionToDatabase(question);
      const thisQuestion = await getQuestionByQuizIdAndOrder(quiz.id, questionCounter);
      let correct = Number(req.body[`answer${questionCounter}`])
      let currentAnswers = req.body[`input${questionCounter}`];
      // console.log(thisQuestion);
      for (let i = 0; i < currentAnswers.length; i++) {
        let currentAnswer = { // push the answer to the database
          question_id: thisQuestion.id,
          text: currentAnswers[i],
          is_correct: (correct - 1 === i)
        };


        await insertanswersDatabase(currentAnswer);
      }
      // increment question counter to set up for the next question if there is one

      questionCounter++;
    }
  }
  res.redirect('/myQuizzes');
});


module.exports = router;
