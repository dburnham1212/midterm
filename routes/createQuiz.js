const express = require('express');
const router  = express.Router();

const { users, quizzes, questions, answers, results, generateRandomString, getUserByEmail, getUserById }  = require("../database_placeholders/users");

const { insertQuizsDatabase, insertQuestionToDatabase, insertanswersDatabase } = require("../db/queries/postQuizToDatabase");

// get route to display quiz creation form
router.get('/', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie

  // pass the values to the webpage and display it
  getUserById(userID).then((user) =>{ // Get the user from the db
    const templateVars = {user: user};
    res.render('createQuiz', templateVars);
  });
});

// Post route for submitting a created quiz
router.post('/', (req, res) => {
  const userID = req.session.userID; // Set user id to id set in the cookie
  let questionCounter = 1; // Setup a value to cycle through the questions

  if(req.body[`${questionCounter}`]) { // check if req.body has a question based off of the number provide
    //const title = req.body[`quiz-title`]; // set the tile of the quiz based off of req.body

   // push an object to the database with the quiz id, userId, and quiz title
      const newQuiz = {
        user_id: userID,
        title: req.body[`quiz-title`],
        rating: 4,
        public: true
      }
      insertQuizsDatabase(newQuiz)
  }
  while(req.body[`${questionCounter}`] ) { // while we still have questions to check
 // push the question to the database
    const question =   {
        quiz_id: quizID,
        text: req.body[`${questionCounter}`], // set the question text to the text found in req.body
        question_order: questionCounter
      }


    insertQuestionToDatabase(question);

    let correct = Number(req.body[`answer${questionCounter}`])
    let currentAnswers = req.body[`input${questionCounter}`];
    for(let i = 0; i < currentAnswers.length; i++) {
      let answerID = generateRandomString(10); // generate an id for the question
      let currentAnswer = { // push the answer to the database
        id: answerID,
        question_id: questionID,
        text: currentAnswers[i],
        is_correct: (correct - 1 === i)
      };


      insertanswersDatabase(currentAnswer)

      answers.push(currentAnswer);
    }
    questionCounter++; // increment question counter to set up for the next question if there is one
  }
  // console.log(quizzes);
  // insertQuizsDatabase(quizzes.title)
    // console.log(quizzes.title)
  // redirect to the myQuizzes page after setup completed
  res.redirect('/myQuizzes');
});

module.exports = router;
