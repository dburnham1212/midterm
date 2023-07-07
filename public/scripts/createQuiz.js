$(() => {
  let questionCount = 0;
  const addquestionTemplate = function () {
    const $quizquestion = (`
<section class="question-main">
<article class="question-card" name="question-card">

  <div class="question-container">
    <label>Question:</label>
    <textarea name="${questionCount}" required></textarea>
    <br>
  </div>
</article>

<article class="answer-card">
<div class="answer-container">
  <div class="answer">
    <label class = "answer-text">Answer 1: </label>
    <input name="input${questionCount}" class = "answer-input-field" required>
    <input class="answer-checkbox" name="answer${questionCount}" value=1 type = "radio" required>
  </div>

  <div class="answer">
    <label class = "answer-text">Answer 2: </label>
    <input name="input${questionCount}" class = "answer-input-field" required>
    <input class="answer-checkbox" name="answer${questionCount}" value=2 type = "radio" required>
  </div>

  <div class="answer">
    <label class = "answer-text">Answer 3: </label>
    <input name="input${questionCount}" class = "answer-input-field" required>
    <input class="answer-checkbox" name="answer${questionCount}" value=3 type = "radio" required>
  </div>

  <div class="answer">
    <label class = "answer-text">Answer 4: </label>
    <input name="input${questionCount}" class = "answer-input-field" required>
    <input class="answer-checkbox" name="answer${questionCount}" value=4 type = "radio" required>
  </div>
</article>

<article class="delete-card">
<div class="delete-container">
    <button class="danger-button delete-question-button">Delete question</button>
</div>
</article>
</section>`)

    return $quizquestion
  }

  const addQuestion = function () {
    questionCount++;
    const addquestionToList = addquestionTemplate();
    $('.new-question-container').append(addquestionToList);

    $('.delete-question-button').on('click', function (event) {
      event.preventDefault();
      $(this).closest(".question-main").remove();
    })
  }

  $('.add-button').on('click', function (event) {
    event.preventDefault();
    addQuestion();
  })

  addQuestion();
})


