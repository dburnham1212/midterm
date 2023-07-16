$(() => {
  $('.share-button').on('click', function(event) {
    const location = "http://localhost:8080" + $(this).data("url")//window.location.href;
    event.preventDefault();
    navigator.clipboard.writeText(`${location}`);
    alert("Click ok to copy the link");
  })
});
