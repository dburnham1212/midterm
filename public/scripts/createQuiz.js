$(() => {
  let questionCount = 0;
  const addquestionTemplate = function() {
    const $quizquestion = (`<div class="question-card" name="question-card">
    <div class="question-container">
    <label>Question:</label>
    <textarea name="${questionCount}" required></textarea>
    <br>
  </div>
  <div class="answer-container">
    <label class = "answer-text">Answer 1:</label>
    <input name="input${questionCount}" class = "answer-input-field" required>
    <input class="answer-checkbox" name="answer${questionCount}" value=1 type = "radio" required>
  </div>
  <div class="answer-container">
    <label class = "answer-text">Answer 2:</label>
    <input name="input${questionCount}" class = "answer-input-field" required>
    <input class="answer-checkbox" name="answer${questionCount}" value=2 type = "radio" required>
  </div>
  <div class="answer-container">
    <label class = "answer-text">Answer 3:</label>
    <input name="input${questionCount}" class = "answer-input-field" required>
    <input class="answer-checkbox" name="answer${questionCount}" value=3 type = "radio" required>
  </div>
  <div class="answer-container">
    <label class = "answer-text">Answer 4:</label>
    <input name="input${questionCount}" class = "answer-input-field" required>
    <input class="answer-checkbox" name="answer${questionCount}" value=4 type = "radio" required>
  </div>
  <button class="danger-button delete-question-button">Delete question</button>
  </div>`)

    return $quizquestion
  }

  const addQuestion = function() {
    //$('.new-question-container').empty();
    questionCount++;


    const addquestionToList = addquestionTemplate();
    $('.new-question-container').append(addquestionToList);

    $('.delete-question-button').on('click', function(event) {
      event.preventDefault();
      $(this).closest(".question-card").remove();
    })
  }

    $('.add-button').on('click', function(event) {
      event.preventDefault();
      // $.ajax({
      //   method: "POST",
      //   url: '/createQuiz'
      //   })
      // .then(
         addQuestion()//)
      // .catch(err => {
      //   console.log("Error :",err);
      // })
    })

    addQuestion();
})


