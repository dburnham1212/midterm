$(() => {

  $('.share-button').on('click', function(event) {
    // console.log($(this).data("url"))
    const location = "http://localhost:8080" + $(this).data("url")//window.location.href;
    // console.log(location)
    event.preventDefault();
    navigator.clipboard.writeText(`${location}`);
    alert("Click ok to copy the link");
  })
});
