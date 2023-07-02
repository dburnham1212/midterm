$(() => {

  const addquestionTemplate = function() {
    const $quizquestion = (`<div class="question-container">
    <label>Question:</label>
    <textarea>
    </textarea>
    <br>
  </div>
  <div class="answer-container">
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
    $('.new-question-container').empty();
    const addquestionToList = addquestionTemplate();
    $('.new-question-container').append(addquestionToList);
  }

    $('.add-button').on('click', function(event) {
      event.preventDefault();
      $.ajax({
        method: "POST",
        url: '/createQuiz'
        })
      .then(
        console.log(addQuestion()))
      .catch(err => {
        console.log("Error :",err);
      })
    })



    // const createQuizElement = function(quiz) {
    //   const $quizcontain = (`<quiz>
    //   <header >
    //   <h2>${quiz.name}</h2>
    //   <question>
    //   <p>${quiz.question}</p>
    //   </question>
    //   <answer>${quiz.answer}</answer>
    //   </header>
    //   </quiz>`)
    // }

  const getQuizData = function() {
    $.get('/createQuiz')
    .then(data => {
      loadData(data)
    }

    )
  
  }
  
  const loadData = function(data) {

    for (let quizData of data) {
      console.log(quizData)
      // createQuizElement(quizData)
      const returnQuiz = createQuizElement()
    }
  }


  const renderQuiz = function(data) {
  
    createQuizElement(data)
      
    }

  $('.submit-button').on('click', function(event) {
    event.preventDefault();
    
    const datatext = $('#new-question-form').serialize();
    $.ajax({
      method: 'GET',
      url: '/createQuiz',
      data: datatext
    }).then(res => {
      console.log(res)
    })


  //   $.Ajax({

  //     method: 'POST',
  //     url: '/createQuiz'
  // }).then(function() {
  //   getQuizData()
  // }
    
  // )
  })

})




