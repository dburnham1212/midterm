$(() => {
  $('.clipboard-button').on('click', function(event) {
    event.preventDefault();
    navigator.clipboard.writeText("http://localhost:8080" + $(this).data("copy"));
    alert("URL copied to clipboard");
  })
});
