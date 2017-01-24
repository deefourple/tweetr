$(document).ready(function() {
 $('.tweet-container').on("mouseenter", function() {
    let buttons = $('.hover-buttons');
    let profilePic = $('#pic');
    let fullName = $('#fullName');
    let userName = $('#userName');
    buttons.css("display", "inline")
    profilePic.css("opacity", "1");
    fullName.css("color", "#244751");
    userName.css("color", "#bbb")
  });
  $('.tweet-container').on("mouseleave", function() {
    let buttons = $('.hover-buttons');
    let profilePic = $('#pic');
    let fullName = $('#fullName');
    let userName = $('#userName');
    buttons.css("display", "none");
    profilePic.css("opacity", "0.5");
    fullName.css("color", "rgba(36, 71, 81, 0.5)");
    userName.css("color", "rgba(186, 186, 186, 0.5)")
  })
});