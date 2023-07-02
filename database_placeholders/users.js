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

const public_quizzes = [
  {
    id: 'quiz1',
    user_id: 'userID',
    title: 'This is a quiz',
    url: 'http://www.thisisthequiz.com',
    rating: 4
  },
  {
    id: 'quiz2',
    user_id: 'userID',
    title: 'This is also a quiz',
    url: 'http://www.thisisthequiz2.com',
    rating: 4
  },
  {
    id: 'quiz1',
    user_id: 'user2ID',
    title: 'This is another quiz',
    url: 'http://www.thisisthequiz3.com',
    rating: 4
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

module.exports = { users, public_quizzes, getUserByEmail };
