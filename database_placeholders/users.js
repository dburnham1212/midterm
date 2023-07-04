const users = {
  userID: {
    id: 'userID',
    email: "test@gmail.com",
    password: "password"
  }
}

const quizzes = [
  {
    id: 'quiz1',
    user_id: 'userID',
    title: 'This is a quiz',
    rating: 4,
    public: true
  }
]

const results = [
  {
    quiz_id: 'quiz1',
    user_id: 'userID',
    highest_score: 0,
    last_score: 0,
    out_of: 3,
    favourited: true,
    rating: 5
  }
];

const questions = [
  {
    id: "question1",
    quiz_id: "quiz1",
    text: 'What is life?'
  },
  {
    id: "question2",
    quiz_id: "quiz1",
    text: 'Why are we here?'
  },
  {
    id: "question3",
    quiz_id: "quiz1",
    text: 'Where are we going?'
  },
  {
    id: "question4",
    quiz_id: "quiz2",
    text: 'Are you a person?'
  },
  {
    id: "question5",
    quiz_id: "quiz2",
    text: 'Are you a frog?'
  },
  {
    id: "question6",
    quiz_id: "quiz2",
    text: 'Are you a dog?'
  },
  {
    id: "question7",
    quiz_id: "quiz2",
    text: 'Are you ok?'
  },
]

const answers = [
  {
    id: "answer1",
    question_id: "question1",
    text: 'Yes',
    is_correct: false
  },
  {
    id: "answer2",
    question_id: "question1",
    text: 'No',
    is_correct: false
  },
  {
    id: "answer3",
    question_id: "question1",
    text: 'Maybe',
    is_correct: true
  },
  {
    id: "answer4",
    question_id: "question1",
    text: 'Sure',
    is_correct: false
  },
  {
    id: "answer5",
    question_id: "question2",
    text: 'Yes',
    is_correct: false
  },
  {
    id: "answer6",
    question_id: "question2",
    text: 'No',
    is_correct: false
  },
  {
    id: "answer7",
    question_id: "question2",
    text: 'Maybe',
    is_correct: true
  },
  {
    id: "answer8",
    question_id: "question2",
    text: 'Sure',
    is_correct: false
  },
  {
    id: "answer9",
    question_id: "question3",
    text: 'Yes',
    is_correct: false
  },
  {
    id: "answer10",
    question_id: "question3",
    text: 'No',
    is_correct: false
  },
  {
    id: "answer11",
    question_id: "question3",
    text: 'Maybe',
    is_correct: true
  },
  {
    id: "answer12",
    question_id: "question3",
    text: 'Sure',
    is_correct: false
  },
  {
    id: "answer13",
    question_id: "question4",
    text: 'Yes',
    is_correct: false
  },
  {
    id: "answer14",
    question_id: "question4",
    text: 'No',
    is_correct: false
  },
  {
    id: "answer15",
    question_id: "question4",
    text: 'Maybe',
    is_correct: true
  },
  {
    id: "answer16",
    question_id: "question4",
    text: 'Sure',
    is_correct: false
  },
  {
    id: "answer17",
    question_id: "question5",
    text: 'Yes',
    is_correct: false
  },
  {
    id: "answer18",
    question_id: "question5",
    text: 'No',
    is_correct: false
  },
  {
    id: "answer19",
    question_id: "question5",
    text: 'Maybe',
    is_correct: true
  },
  {
    id: "answer20",
    question_id: "question5",
    text: 'Sure',
    is_correct: false
  },
  {
    id: "answer21",
    question_id: "question6",
    text: 'Yes',
    is_correct: false
  },
  {
    id: "answer22",
    question_id: "question6",
    text: 'No',
    is_correct: false
  },
  {
    id: "answer23",
    question_id: "question6",
    text: 'Maybe',
    is_correct: true
  },
  {
    id: "answer24",
    question_id: "question6",
    text: 'Sure',
    is_correct: false
  },
  {
    id: "answer25",
    question_id: "question7",
    text: 'Yes',
    is_correct: false
  },
  {
    id: "answer26",
    question_id: "question7",
    text: 'No',
    is_correct: false
  },
  {
    id: "answer27",
    question_id: "question7",
    text: 'Maybe',
    is_correct: true
  },
  {
    id: "answer28",
    question_id: "question7",
    text: 'Sure',
    is_correct: false
  }
]


const generateRandomString = function(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';//usable characters
  let count = 0;
  let randomString = '';
  // loop throught the available characters and append each to randomString
  while (count < length) {
    let charPosition = Math.round(Math.random() * (chars.length - 1));
    randomString = `${randomString}${chars.charAt(charPosition)}`;
    count ++;
  }
  return randomString;
};



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
  .query(`SELECT * FROM quizs
  JOIN users ON users.id = user_id
  WHERE public = true
  `)
  .then(data => {
    console.log(data.rows)
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
    // console.log(data.rows[0]);
    //'test@gmail.com'
    if (data.rows[0].email === email) {
      //'userID'
      return data.rows[0];
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
 };

module.exports = {
  users,
  quizzes,
  questions,
  answers,
  results,
  generateRandomString,
  getUserByEmail,
  getUserById,
  getQuizByPublic
};
