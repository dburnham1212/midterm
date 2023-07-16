const db = require('../connection');

const removeFromFavourites = function (userID, quizID) {
  return db
  .query(`DELETE FROM favourites
  WHERE user_id = $1
  AND quiz_id = $2`, [userID, quizID]).then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
};

const removeFromQuizzes = function (quizID) {
  return db
  .query(`DELETE FROM quizs
  WHERE id = $1`,
   [quizID]).then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
};

module.exports = { removeFromFavourites, removeFromQuizzes }
