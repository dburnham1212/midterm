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

const addToUsers = function (user) {
  const userString = `
  INSERT INTO users (
    username, email, password
  )
  VALUES (
    $1, $2, $3
  );
  `;
  const container = [`${user.username}`, `${user.email}`, `${user.password}`];
  return db.query(userString, container);
}

const addToQuizs = function (quiz) {
  const questString = `
  INSERT INTO quizs (
    user_id, title, rating, public
  )
  VALUES (
    $1, $2, $3, $4
  );
  `;
  const container = [`${quiz.user_id}`, `${quiz.title}`, `${quiz.rating}`, `${quiz.public}`];
  return db.query(questString, container);
}

const addToQuestions = (question) => {
  const questString = `
  INSERT INTO questions (
    quiz_id, question_text, question_order
  )
  VALUES (
    $1, $2, $3
  );
  `;

  const container = [`${question.quiz_id}`, `${question.question_text}`, `${question.question_order}`];
  return db.query(questString, container);
}

const addToAnswers = function (answer) {
  const questString = `
  INSERT INTO answers (
    question_id, text, is_correct
  )
  VALUES (
    $1, $2, $3
  );
  `;

  const container = [`${answer.question_id}`, `${answer.text}`, `${answer.is_correct}`];
  return db.query(questString, container);
}

// INSERT INTO results (user_id, quiz_id, highest_score, last_score, out_of, is_favorite, rating) VALUES (1, 1, 0, 0, 0, true, 4);
const addToResults = function (result) {
  const questString = `
  INSERT INTO results (
    user_id, quiz_id, highest_score, last_score, out_of, rating
  )
  VALUES (
    $1, $2, $3, $4, $5, $6
  );
  `;
  const container = [`${result.user_id}`, `${result.quiz_id}`, `${result.highest_score}`, `${result.last_score}`, `${result.out_of}`, `${result.rating}`];
  return db.query(questString, container);
}

module.exports = { addToFavourites, addToUsers, addToQuizs, addToQuestions, addToAnswers, addToResults }
