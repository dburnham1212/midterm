const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('myQuizzes');
});

module.exports = router;
