$(() => {
  
  $('.share-button').on('click', function(event) {
    const location = window.location.href;
    console.log(location)
    event.preventDefault();
    navigator.clipboard.writeText(`${location}`);
    alert("click ok to copy the link");
  })
});