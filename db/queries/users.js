const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// const getUserByEmail = function(email, users) {
//   for (const userID in users) {
//     if (users[userID].email === email) {
//       return users[userID];
//     }
//   }
//   return undefined;
// };

// const getUserByEmail = function (email) {
//   return pool
//   .query(`SELECT *
//   FROM users
//   WHERE email = $1 LIMIT 1`, [email])
//   .then((result) => {
//     if (result.rows.length > 0) {
//       return result.rows[0];
//     } else {
//       return null;
//       }
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// };

const getUserByEmail = (email, users) => {
  return db.query(`SELECT * FROM users
  WHERE email = $1 LIMIT 1`, [email])
  .then(data => {
   console.log(data.rows);
   console.log()
   //  if (data.rows === email ) {
   //   //  return users[data];
   //  } else {
   //    return null;
   //    }
  })
  .catch((err) => {
    console.log(err.message);
  });
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


module.exports = { getUsers, getUserByEmail };
