-- Drop and recreate Users table (Example)

-- \i db/migrations/01_schema.sql
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS quizs CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS taker_answers CASCADE;
DROP TABLE IF EXISTS results CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  date_created TIMESTAMP
);

CREATE TABLE quizs (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  rating INTEGER,
  public BOOLEAN DEFAULT false,
  date_created TIMESTAMP
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizs(id) ON DELETE CASCADE,
  highest_score TEXT,
  last_score TEXT,
  out_of INTEGER,
  is_favorite BOOLEAN DEFAULT false,
  rating INTEGER
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizs(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  question_order INTEGER
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

-- CREATE TABLE taker_answers (
--   id SERIAL PRIMARY KEY NOT NULL,
--   result_id INTEGER REFERENCES results(id) ON DELETE CASCADE,
--   answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE,
--   option VARCHAR(255) NOT NULL,
--   is_correct BOOLEAN
-- );

\i db/seeds/0_users.sql




