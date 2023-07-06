const db = require('../db/connection');

const getUserById = (id) => {
  return db
  .query(`SELECT * FROM users
  WHERE id = $1 LIMIT 1;`, [id])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getQuizByPublic = () => {
  return db
  .query(`SELECT quizs.id, quizs.user_id, quizs.title, quizs.rating, users.email
  FROM quizs
  JOIN users ON users.id = user_id
  WHERE public = true
  ORDER BY quizs.date_created;
  `)
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getMyQuizzesByID = (userID) => {
  return db
  .query(`SELECT quizs.id, quizs.user_id, quizs.title, results.highest_score, results.out_of FROM quizs
  LEFT OUTER JOIN results ON quizs.id = results.quiz_id
  WHERE quizs.user_id = $1;
  `, [userID])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getFavQuizzesByUserId = (userID) => {
  return db
  .query(`SELECT quizs.id as quiz_id, quizs.user_id as id, quizs.title FROM quizs
  JOIN favourites ON favourites.quiz_id = quizs.id
  JOIN users ON favourites.user_id = users.id
  WHERE favourites.user_id = $1;
  `, [userID])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getQuizeByTitleAndUserID = (title, userID) => {
  return db
  .query(`SELECT * FROM quizs
  WHERE quizs.title = $1 AND quizs.user_id = $2;
  `, [title, userID])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getQuizByQuizId = (quizID) => {
  return db
  .query(`SELECT * FROM quizs
  WHERE quizs.id = $1;
  `, [quizID])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getQuestionsByQuizId = (quizID) => {
  return db
  .query(`SELECT * FROM questions
  WHERE questions.quiz_id = $1;
  `, [quizID])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getQuestionByQuizIdAndOrder = (quizID, question_order) => {
  return db
  .query(`SELECT * FROM questions
  WHERE questions.quiz_id = $1 AND questions.question_order = $2;
  `, [quizID, question_order])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getQuizAvgRatingById = (quizID) => {
  return db
  .query(`SELECT ROUND(AVG(results.rating), 2) AS rating FROM quizs
  LEFT OUTER JOIN results ON results.quiz_id = quizs.id
  WHERE quizs.id = $1;
  `, [quizID])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getResultByUserAndQuiz = (userID, quizID) => {
  return db
  .query(`SELECT results.id, results.highest_score, results.last_score, results.out_of, results.rating FROM results
  JOIN quizs ON results.quiz_id = quizs.id
  JOIN users ON results.user_id = users.id
  WHERE users.id = $1 AND quizs.id = $2;
  `, [userID, quizID])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getAnswersByQuizId = (quiz_id) => {
  return db
  .query(`SELECT answers.id, answers.question_id, answers.text, answers.is_correct FROM answers
  JOIN questions ON questions.id = answers.question_id
  WHERE questions.quiz_id = $1;
  `, [quiz_id])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getCorrectAnswersByQuizId = (quiz_id) => {
  return db
  .query(`SELECT answers.id, answers.question_id, answers.text, answers.is_correct FROM answers
  JOIN questions ON questions.id = answers.question_id
  WHERE questions.quiz_id = $1 AND is_correct=true;
  `, [quiz_id])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const getUserByEmail = (email, users) => {
  return db
  .query(`SELECT * FROM users
  WHERE email = $1 LIMIT 1;`, [email])
  .then(data => {
    if (data.rows[0].email === email) {
      return data.rows[0];
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
 };


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

const removeFromFavourites = function (userID, quizID) {
  return db
  .query(`DELETE FROM favourites
  WHERE user_id = $1
  AND quiz_id = $2`, [userID, quizID]).then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
};

const getFavourite = function (userID, quizID) {
  return db
  .query(`SELECT * FROM favourites
  WHERE user_id = $1
  AND quiz_id = $2`, [userID, quizID]).then(data => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
};

const updateFavourite = function (userID, quizID, isTrue) {
  return db
  .query(`UPDATE results
  SET is_favorite = $3
  WHERE user_id = $1
  AND quiz_id = $2`, [userID, quizID, isTrue]);
};

module.exports = {
  getUserByEmail,
  getUserById,
  getQuizByPublic,
  getMyQuizzesByID,
  getFavQuizzesByUserId,
  getQuizByQuizId,
  getQuestionsByQuizId,
  getAnswersByQuizId,
  getResultByUserAndQuiz,
  getQuizeByTitleAndUserID,
  getQuestionByQuizIdAndOrder,
  getCorrectAnswersByQuizId,
  getQuizAvgRatingById,
  getFavourite,
  updateFavourite,
  addToFavourites,
  removeFromFavourites
};
