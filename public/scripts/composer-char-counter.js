console.log("Sup")

$(document).ready(function() {
const limit = 140;
let counter = 0;
//let baseCounter = 0;
  $('#tweet-text').on('input', () => {
    console.log($('#tweet-text').val().length);
    let length = $('#tweet-text').val().length;

    counter = limit - length;

    if(counter < 0) {
      $("#counter").addClass('negCounter');
    } else {
      $("#counter").addClass('Counter');
    }

  $('#counter').text(counter);
});

});

//$('#tweet-text').val().length;