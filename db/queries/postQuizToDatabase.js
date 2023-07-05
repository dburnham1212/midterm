const db = require('../connection');
//db.query=pool.query
// const insertDatabase = function() {
//   insertquizsDatabase();
//   insertusersDatabase();
//   insertanswersDatabase();
//   insertquestionsDatabase();
// }

const insertusersDatabase = function (quiz) {
  const questString = `
  INSERT INTO users;
  `;
  const container = [quiz.users];

  return db.query(questString, container);
}

const insertUserToDatabase = function (user) {
  const userString = `
  INSERT INTO users (
    username, email, password
  )
  VALUES (
    $1, $2, $3
  );
  `;
  const container = ["username", `${user.email}`, `${user.password}`];
  return db.query(userString, container);
}

const insertQuizsDatabase = function (quiz) {
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

const insertQuestionToDatabase = (question) => {
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


const insertanswersDatabase = function (answer) {
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
const addResultToDatabase = function (result) {
  const questString = `
  INSERT INTO results (
    user_id, quiz_id, highest_score, last_score, out_of, is_favorite, rating
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7
  );
  `;
  const container = [`${result.user_id}`, `${result.quiz_id}`, `${result.highest_score}`, `${result.last_score}`, `${result.out_of}`, `${result.favourited}`, `${result.rating}`];
  return db.query(questString, container);
}

const updateResult = function (result) {
  const questString = `
    UPDATE results
    SET highest_score = $1, last_score = $2, out_of = $3, is_favorite = $4, rating = $5
    WHERE results.id = ${result.id};
  `;
  const container = [`${result.highest_score}`, `${result.last_score}`, `${result.out_of}`, `${result.is_favorite}`, `${result.rating}`];
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




module.exports = { insertQuizsDatabase, insertQuestionToDatabase, insertanswersDatabase, addResultToDatabase, updateResult, insertUserToDatabase, updateQuizRating };
