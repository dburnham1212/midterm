const db = require('../connection');

const getTitleByUser = function(quiz) {
  const questString = `
  SELECT title FROM quizs
  WHERE user_id = $1
  AND title = $2
  `;
  const container = [`${quiz.user_id}`, `${quiz.title}`];
  return db.query(questString, container)
  .then(res => {
    return res.rows;
  });
}


module.exports = { getTitleByUser };