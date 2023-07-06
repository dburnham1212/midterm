const db = require('../connection');

const addToFavourites = function (userID, quizID) {
  return db
  .query(`INSERT INTO favourites (
    user_id, quiz_id
  )
  VALUES (
    $1, $2
  );`, [userID, quizID]).then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
};

module.exports = { addToFavourites }
