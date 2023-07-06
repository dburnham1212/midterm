const db = require('../connection');

const updateFavourite = function (userID, quizID, isTrue) {
  return db
  .query(`UPDATE results
  SET is_favorite = $3
  WHERE user_id = $1
  AND quiz_id = $2`, [userID, quizID, isTrue]);
};

module.exports = { updateFavourite }
