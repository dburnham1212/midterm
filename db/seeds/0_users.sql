INSERT INTO users (username, email, password)
VALUES ('userID', 'test@gmail.com', 'password');
INSERT INTO users (username, email, password)
VALUES ('user2ID', 'test2@gmail.com', 'password');
INSERT INTO users (username, email, password)
VALUES ('Alice', 'alice@gmail.com', 'password');
INSERT INTO users (username, email, password)
VALUES ('Kira', 'kira@gmail.com', 'password');


INSERT INTO quizs (user_id, title, rating, public)
VALUES (1, 'This is a quiz', 4, true );
INSERT INTO quizs (user_id, title, rating, public)
VALUES (1, 'This is also a quiz', 4, false );
INSERT INTO quizs (user_id, title, rating, public)
VALUES (2, 'This is another quiz', 4, true );
INSERT INTO quizs (user_id, title, rating, public)
VALUES (1, 'This is a last quiz', 4, true );

INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'What is life?', 1 );
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'Why are we here?', 2);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'Where are we going?', 3);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'Where will we be?', 4);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'How are we going?', 5);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'Why are we going?', 6);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'Where What Who are we going?', 7);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'Who who who?', 8);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'Where are we?', 9);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (1, 'Where we going are?', 10);


INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'Are you a person?', 1);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'Are you a frog?', 2);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'Are you a dog?', 3);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'Are you a hog?', 4);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'Are you ok?', 5);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'Are we ok?', 6);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'Is he okay?', 7);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'Are you sure?', 8);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'He doesnt look okay?', 9);
INSERT INTO questions (quiz_id, question_text, question_order)
VALUES (2, 'seriously', 10);


INSERT INTO answers (question_id, text, is_correct) VALUES (1, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (1, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (1, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (1, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (2, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (2, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (2, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (2, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (3, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (3, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (3, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (3, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (4, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (4, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (4, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (4, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (5, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (5, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (5, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (5, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (6, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (6, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (6, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (6, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (7, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (7, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (7, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (7, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (8, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (8, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (8, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (8, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (9, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (9, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (9, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (9, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (10, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (10, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (10, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (10, 'Sure', false);


INSERT INTO answers (question_id, text, is_correct) VALUES (11, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (11, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (11, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (11, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (12, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (12, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (12, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (12, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (13, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (13, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (13, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (13, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (14, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (14, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (14, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (14, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (15, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (15, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (15, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (15, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (16, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (16, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (16, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (16, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (17, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (17, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (17, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (17, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (18, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (18, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (18, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (18, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (19, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (19, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (19, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (19, 'Sure', false);

INSERT INTO answers (question_id, text, is_correct) VALUES (20, 'Yes', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (20, 'No', false);
INSERT INTO answers (question_id, text, is_correct) VALUES (20, 'Maybe', true);
INSERT INTO answers (question_id, text, is_correct) VALUES (20, 'Sure', false);


INSERT INTO results (user_id, quiz_id, highest_score, last_score, out_of, is_favorite, rating) VALUES (1, 1, 0, 0, 0, true, 4);
INSERT INTO results (user_id, quiz_id, highest_score, last_score, out_of, is_favorite, rating) VALUES (2, 2, 0, 0, 0, false, 3);
INSERT INTO results (user_id, quiz_id, highest_score, last_score, out_of, is_favorite, rating) VALUES (1, 3, 0, 0, 0, false, 2);


