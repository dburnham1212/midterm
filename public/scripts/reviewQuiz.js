$(() => {
    $('.fav-button').on('click', function(event) {
      console.log($(this))
      if($(this).hasClass(".fa-solid")){
        $(this).addClass("fa-regular");
        $(this).removeClass("fa-solid");
      } else {
        $(this).addClass(".fa-solid");
        $(this).removeClass("fa-regular");
      }
    })
})
