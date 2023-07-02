// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const { users, quizzes, favourites, questions, answers, results, getUserByEmail, generateRandomString } = require("./database_placeholders/users");

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));


// MIDDLEWARE
app.use(cookieSession({
  name: 'session',
  keys: ['Key1', 'Key2', 'Key3'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const myQuizzesRoutes = require('./routes/myQuizzes'); // My Quizzes Routes
const createQuizRoutes = require('./routes/createQuiz'); // Create Quiz Routes
const publicQuizzesRoutes = require('./routes/publicQuizzes'); // Public Quizzes Routes
const takeQuizRoutes = require('./routes/takeQuiz'); // Take Quiz Routes
const submitQuizRoutes = require('./routes/submitQuiz'); // Submit Quiz Routes

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/myQuizzes', myQuizzesRoutes); // Using My Quizzes Routes
app.use('/createQuiz', createQuizRoutes); // Using Create Quiz Routes
app.use('/publicQuizzes', publicQuizzesRoutes); // Using Public Quizzes Routes
app.use('/takeQuiz', takeQuizRoutes); // Using Public Quizzes Routes
app.use('/submitQuiz', submitQuizRoutes); // Using Public Quizzes Routes

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const userID = req.session.userID;

  const templateVars = {user: users[userID]};
  res.render('index', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
