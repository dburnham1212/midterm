const db = require('../connection');

// Get a specific result based off of a user and quiz id
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

module.exports = { getResultByUserAndQuiz };
