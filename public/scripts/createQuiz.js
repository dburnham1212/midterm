$(() => {

  const addquestionTemplate = function() {
    const $quizquestion = (`<div class="answer-container">
    <label class = "answer-text">Answer 1:</label>
    <input class = "answer-input-field">
    <input class="answer-checkbox" type = "checkbox">
  </div>
  <div class="answer-container">
    <label class = "answer-text">Answer 2:</label>
    <input class = "answer-input-field">
    <input class="answer-checkbox" type = "checkbox">
  </div>
  <div class="answer-container">
    <label class = "answer-text">Answer 3:</label>
    <input class = "answer-input-field">
    <input class="answer-checkbox" type = "checkbox">
  </div>
  <div class="answer-container">
    <label class = "answer-text">Answer 4:</label>
    <input class = "answer-input-field">
    <input class="answer-checkbox" type = "checkbox">
  </div>`)

    return $quizquestion
  }

  const addQuestion = function() {
    addquestionTemplate()
  }

    $('.add-button').on('click', function(event) {
      event.preventDefault();
      $.get('/createQuiz')
      .then(addQuestion())
      .catch(err => {
        console.log("Error :",err);
      })
    })



    const createQuizElement = function(quiz) {
      const $quizcontain = (`<quiz>
      <header >
      <h2>${quiz.name}</h2>
      <question>
      <p>${quiz.question}</p>
      </question>
      <answer>${quiz.answer}</answer>
      </header>
      </quiz>`)
    }

//   const getQuizData = function() {

  
//   }
  
  
//   const renderQuiz = function(data) {
  
  
//       createQuizElement(data)
      
//     }
  
//     const returnQuiz = createQuizElement()
  

  
//     $('.question-container')
  

//   $('.submit-button').on('Submit', function(event) {
//     event.preventDefault();
  

//     $.Ajax({
//       method: 'POST',
//       url: '/createQuiz'
//   }).then(function() {
  
//   }
    
//   )
//   })

})




