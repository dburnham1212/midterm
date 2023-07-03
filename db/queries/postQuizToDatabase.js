const db = require('../connection');
//db.query=pool.query
// const insertDatabase = function() {
//   insertquizsDatabase();
//   insertusersDatabase();
//   insertanswersDatabase();
//   insertquestionsDatabase();
// }

const insertusersDatabase = function(quiz) {
  const questString = `
  INSERT INTO users;
  `;
  const container = [quiz.users];

  return db.query(questString, container);
}

const insertQuizsDatabase = function(title) {
  const questString = `
  INSERT INTO quizs (
    title
  )
  VALUES (
    $1
  );
  `;
  const container = [`${title}`];
  return db.query(questString, container);
}

const insertquestionsDatabase = function(text) {
  const questString = `
  INSERT INTO questions (
    title
  )
  VALUES (
    $1
  );
  `;

  const container = [`${text}`];
  return db.query(questString, container);
}


const insertanswersDatabase = function(answer) {
  const questString = `
  INSERT INTO answers (
    text, is_correct
  )
  VALUES (
    $1, $2
  );
  `;

  const container = [`${answer.text}`, `${answer.is_correct}`];
  return db.query(questString, container);
}


module.exports = { insertQuizsDatabase, insertquestionsDatabase, insertanswersDatabase };