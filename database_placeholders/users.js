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

const getUserByEmail = function(email, users) {
  for (const userID in users) {
    if (users[userID].email === email) {
      return users[userID];
    }
  }
  return undefined;
};

module.exports = { users, getUserByEmail };
