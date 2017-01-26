$(document).ready(function() {
  $('#textField').on("input", function() {
    let screenTotal = 140;
    //select the textarea and find its length
    let charCount = $(this).val().length;
    //set counter to subtract from the length of the textarea
    let currentCount = screenTotal - charCount;
    //display the currentCount variable on the screen
    $('.counter').text(currentCount);
    if (currentCount < 0) {
      $('.counter').text(currentCount).css("color", "#ff0000").css("font-size", "1.15em");
    } else {
      $('.counter').text(currentCount).css("color", "#4adb1a").css("font-size", "1em");
    }
  });
});
