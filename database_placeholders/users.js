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
    question: 'What is life?',
    question_number: 1,
  },
  {
    id: "question2",
    quiz_id: "quiz1",
    question: 'Why are we here?',
    question_number: 2,
  },
  {
    id: "question3",
    quiz_id: "quiz1",
    question: 'Where are we going?',
    question_number: 3,
  }
]

const answers = [
  {

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

module.exports = { users, quizzes, favourites, questions, getUserByEmail, generateRandomString };
