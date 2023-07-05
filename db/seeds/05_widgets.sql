-- Widgets table seeds here (Example)
-- INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
-- INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
-- INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);
SELECT users.id, quizs.title, quizs.rating, results.highest_score, questions.question_text, answers.text FROM users
JOIN quizs ON user_id = users.id
JOIN results ON results.quiz_id = quizs.id
JOIN questions ON questions.quiz_id = quizs.id
JOIN answers ON question_id = questions.id
GROUP BY users.id;
