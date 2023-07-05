-- Widgets table seeds here (Example)
-- INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
-- INSERT INTO widgets (name, user_id) VALUES ('Chains', 2);
-- INSERT INTO widgets (name, user_id) VALUES ('Bearings', 2);
SELECT * FROM users
JOIN quizs ON user_id = users.id
JOIN results ON quiz_id = quizs.id
JOIN questions ON quiz_id = quizs.id
JOIN answers ON question_id = questions.id
