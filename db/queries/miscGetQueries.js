const db = require('../connection');

// Get a result for a user and a specific quiz
const getResultByUserAndQuiz = (userID, quizID) => {
  return db
  .query(`SELECT results.id, results.highest_score, results.last_score, results.out_of, results.rating FROM results
  JOIN quizs ON results.quiz_id = quizs.id
  JOIN users ON results.user_id = users.id
  WHERE users.id = $1 AND quizs.id = $2;
  `, [userID, quizID])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// Grab a favourite from the favourites table
const getFavourite = function (userID, quizID) {
  return db
  .query(`SELECT * FROM favourites
  WHERE user_id = $1
  AND quiz_id = $2`, [userID, quizID]).then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
};

// Get ansers based off of a certain quiz id
const getAnswersByQuizId = (quiz_id) => {
  return db
  .query(`SELECT answers.id, answers.question_id, answers.text, answers.is_correct FROM answers
  JOIN questions ON questions.id = answers.question_id
  WHERE questions.quiz_id = $1;
  `, [quiz_id])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getCorrectAnswersByQuizId = (quiz_id) => {
  return db
  .query(`SELECT answers.id, answers.question_id, answers.text, answers.is_correct FROM answers
  JOIN questions ON questions.id = answers.question_id
  WHERE questions.quiz_id = $1 AND is_correct=true;
  `, [quiz_id])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = { getResultByUserAndQuiz, getFavourite, getAnswersByQuizId, getCorrectAnswersByQuizId }
