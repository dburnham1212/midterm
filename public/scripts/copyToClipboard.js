$(() => {
  $('.clipboard-button').on('click', function(event) {
    event.preventDefault();
    console.log("here");
    navigator.clipboard.writeText("http://localhost:8080" + $(this).data("copy"));
    alert("URL copied to clipboard");
  })
});
