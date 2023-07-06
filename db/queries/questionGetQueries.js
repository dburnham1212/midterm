const db = require('../connection');

// Get questions by a specific quiz id
const getQuestionsByQuizId = (quizID) => {
  return db
  .query(`SELECT * FROM questions
  WHERE questions.quiz_id = $1;
  `, [quizID])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// Get questions by a specific quiz id and question order
const getQuestionByQuizIdAndOrder = (quizID, question_order) => {
  return db
  .query(`SELECT * FROM questions
  WHERE questions.quiz_id = $1 AND questions.question_order = $2;
  `, [quizID, question_order])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = { getQuestionsByQuizId, getQuestionByQuizIdAndOrder }
