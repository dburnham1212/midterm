-- QUERY TO GET QUIZZES FOR A SPECIFIC USER
-- SELECT quizs.id, quizs.user_id, quizs.title, results.highest_score, results.out_of FROM quizs
--   LEFT OUTER JOIN results ON quizs.id = results.quiz_id
--   WHERE quizs.user_id = 1

-- SELECT quizs.id, quizs.user_id, quizs.title, results.highest_score, results.out_of FROM quizs
--  LEFT OUTER JOIN results ON quizs.id = results.quiz_id
--  WHERE results.user_id = 1 AND results.is_favorite = true;

SELECT * FROM quizs
JOIN questions ON questions.quiz_id = quizs.id
JOIN answers ON questions.id = answers.question_id
WHERE quizs.id = 1;

-- SELECT AVG(results.rating) FROM quizs
-- JOIN results ON quizs.id = results.quiz_id
-- WHERE quizs.id = 1;
