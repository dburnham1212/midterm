const db = require('../connection');

const updateFavourite = function (userID, quizID, isTrue) {
  return db
  .query(`UPDATE results
  SET is_favorite = $3
  WHERE user_id = $1
  AND quiz_id = $2`, [userID, quizID, isTrue]);
};

const updateResult = function (result) {
  const questString = `
    UPDATE results
    SET highest_score = $1, last_score = $2, out_of = $3, rating = $4
    WHERE results.id = ${result.id};
  `;
  const container = [`${result.highest_score}`, `${result.last_score}`, `${result.out_of}`, `${result.rating}`];
  return db.query(questString, container);
}

const updateQuizRating = function (quizID, newRating) {
  const ratingString = `
  UPDATE quizs
    SET rating = $1
    WHERE id = $2; `
  const container = [`${newRating}`, `${quizID}`];
  return db.query(ratingString, container);
}

module.exports = { updateFavourite, updateResult, updateQuizRating }
