$(() => {
  const $popupContainer = $(".popup-container");
  let $deleteQuizButton = $('.delete-quiz-button');

  let quizID = -1;
  $popupContainer.hide();

  $deleteQuizButton.on('click', function (event) {
    $popupContainer.show();
    $popupContainer.css('display', 'flex');
    quizID = $(this).data('quizid');
    $deleteQuizButton = $(this);
    $popupContainer.find("#delete-text-field").text($deleteQuizButton.siblings(".quiz-name").text());
  })

  // Close down the button
  const $deleteCloseButton = $popupContainer.find("#delete-popup-close");
  $deleteCloseButton.on('click', function (event) {
    $popupContainer.hide();
  })

  // Accept that the button has been clicked and go through a post route to delete the quiz
  const $deleteConfirmButton = $popupContainer.find("#delete-popup-confirm");
  $deleteConfirmButton.on('click', function (event) {
    $deleteQuizButton.closest(".list-item").remove();
    const $favouritesList = $(".favourites-item");
    $favouritesList.each( function(){
      if($(this).data("quizid") == quizID){
        $(this).remove();
      }
    });
    $.ajax({
      method: "POST",
      url: `/myQuizzes/delete/${quizID}`
    }).then(() => {
      $popupContainer.hide();
    });
  })
});
