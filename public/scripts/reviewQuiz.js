$(() => {
    $('.fav-button').on('click', function(event) {
      console.log($(this))
      if($(this).hasClass(".fav-button-selected")){
        $(this).addClass(".fav-button");
        $(this).addClass("fa-regular");
        $(this).removeClass("fa-solid");
        $(this).removeClass(".fav-button-selected");
      } else {
        $(this).addClass(".fav-button-selected");
        $(this).addClass("fa-solid");
        $(this).removeClass("fa-regular");
        $(this).removeClass(".fav-button");
      }
    })
})
