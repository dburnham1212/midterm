const db = require('../connection');

// Get public quizzes from the db
const getQuizzesByPublic = () => {
  return db
  .query(`SELECT quizs.id, quizs.user_id, quizs.title, quizs.rating, users.email
  FROM quizs
  JOIN users ON users.id = user_id
  WHERE public = true
  ORDER BY quizs.date_created;
  `)
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// Get my quizzes from the db
const getMyQuizzesByID = (userID) => {
  return db
  .query(`SELECT quizs.id, quizs.user_id, quizs.title
  FROM quizs
  WHERE quizs.user_id = $1
  ORDER BY quizs.date_created;
  `, [userID])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// Get favourite quizzes from the db
const getFavQuizzesByUserId = (userID) => {
  return db
  .query(`SELECT quizs.id, users.username, quizs.title, quizs.rating FROM quizs
  JOIN favourites ON favourites.quiz_id = quizs.id
  JOIN users ON quizs.user_id = users.id
  WHERE favourites.user_id = $1
  ORDER BY quizs.date_created;
  `, [userID])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// Get the average rating of a quiz based on the id
const getQuizAvgRatingById = (quizID) => {
  return db
  .query(`SELECT ROUND(AVG(results.rating), 2) AS rating FROM quizs
  JOIN results ON results.quiz_id = quizs.id
  WHERE quizs.id = $1;
  `, [quizID])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// Get a quiz based off of a specific quiz id
const getQuizByQuizId = (quizID) => {
  return db
  .query(`SELECT * FROM quizs
  WHERE quizs.id = $1;
  `, [quizID])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// Get a quiz based off of the title and user id
const getQuizByTitleAndUserID = (title, userID) => {
  return db
  .query(`SELECT * FROM quizs
  WHERE quizs.title = $1 AND quizs.user_id = $2;
  `, [title, userID])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

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


module.exports = { getQuizzesByPublic, getMyQuizzesByID, getFavQuizzesByUserId, getQuizAvgRatingById, getQuizByQuizId, getQuizByTitleAndUserID, getTitleByUser }
