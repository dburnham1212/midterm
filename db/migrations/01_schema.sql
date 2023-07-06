--Create Database Tables and Populate

-- \c midterm \i db/migrations/01_schema.sql
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS quizs CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS results CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quizs (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  rating VARCHAR(30),
  public BOOLEAN DEFAULT false,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizs(id) ON DELETE CASCADE,
  question_text VARCHAR(255) NOT NULL,
  question_order INTEGER
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizs(id) ON DELETE CASCADE,
  highest_score TEXT,
  last_score TEXT,
  out_of INTEGER,
  rating INTEGER DEFAULT 1
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizs(id) ON DELETE CASCADE
);





 \i db/seeds/0_users.sql
 \i db/seeds/2_quizs.sql
 \i db/seeds/3_questions.sql
 \i db/seeds/4_answers.sql
 \i db/seeds/5_favourites.sql
 \i db/seeds/1_results.sql
