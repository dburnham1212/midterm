const db = require('../connection');
//db.query=pool.query
const insertDatabase = function() {
  insertquizsDatabase();
  insertusersDatabase();
  insertanswersDatabase();
  insertquestionsDatabase();
}

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
    '${title}'
  );`
    return db.query(questString)
  // const questString = `
  // INSERT INTO quizs (
  //   title
  // )
  // VALUES (
  //   ${title}
  // );
  // `;
  // const container = [title];
  // return db.query(questString, container);
}

const insertquestionsDatabase = function(quiz) {
  const questString = `
  INSERT INTO questions (

  )
  VALUES (

  );
  `;

  const container = [quiz.questions];
  return db.query(questString, container);
}


const insertanswersDatabase = function(quiz) {
  const questString = `
  INSERT INTO answers (

  )
  VALUES (
    
  );
  `;

  const container = [quiz.answers];
  return db.query(questString, container);
}


module.exports = { insertQuizsDatabase };