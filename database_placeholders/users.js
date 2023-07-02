const users = {
  userID: {
    id: 'userID',
    email: "test@gmail.com",
    password: "password"
  },
  user2ID: {
    id: 'user2ID',
    email: "test2@gmail.com",
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
  },
  {
    id: 'quiz2',
    user_id: 'userID',
    title: 'This is also a quiz',
    rating: 4,
    public: false
  },
  {
    id: 'quiz3',
    user_id: 'user2ID',
    title: 'This is another quiz',
    rating: 4,
    public: true
  }
]

const favourites = [
  {
    quiz_id: 'quiz1',
    user_id: 'userID'
  },
  {
    quiz_id: 'quiz2',
    user_id: 'user2ID'
  },
  {
    quiz_id: 'quiz3',
    user_id: 'userID'
  }
]

const results = [
  {
    quiz_id: 'quiz1',
    user_id: 'userID',
    result: 5,
  }
];

const questions = [
  {
    id: "question1",
    quiz_id: "quiz1",
    text: 'What is life?',
    question_number: 1,
  },
  {
    id: "question2",
    quiz_id: "quiz1",
    text: 'Why are we here?',
    question_number: 2,
  },
  {
    id: "question3",
    quiz_id: "quiz1",
    text: 'Where are we going?',
    question_number: 3,
  }
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
    text: 'Yes',
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
    text: 'Yes',
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
    text: 'Yes',
    is_correct: false
  }
]

const getUserByEmail = function(email, users) {
  for (const userID in users) {
    if (users[userID].email === email) {
      return users[userID];
    }
  }
  return undefined;
};

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

module.exports = { users, quizzes, favourites, questions, answers, getUserByEmail, generateRandomString };
