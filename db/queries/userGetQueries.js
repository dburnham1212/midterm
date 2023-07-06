const db = require('../connection');

// Get a specific user based off of their id
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

// Get a specific user based off of their email adress
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

module.exports = { getUserById, getUserByEmail }
