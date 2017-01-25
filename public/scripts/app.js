/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 var hover = function() {
    $('.tweet-container article').on("mouseenter", function(event) {
    let tweetArticle = $(event.target);
    let buttons = tweetArticle.find('.hover-buttons');
    let profilePic = tweetArticle.find('.pic');
    let fullName = tweetArticle.find('.fullName');
    let userName = tweetArticle.find('.userName');
    buttons.css("display", "inline")
    profilePic.css("opacity", "1");
    fullName.css("color", "#244751");
    userName.css("color", "#bbb")
  });
  $('.tweet-container article').on("mouseleave", function(event) {
    let tweetArticle = $(event.target);
    let buttons = tweetArticle.find('.hover-buttons');
    let profilePic = tweetArticle.find('.pic');
    let fullName = tweetArticle.find('.fullName');
    let userName = tweetArticle.find('.userName');
    buttons.css("display", "none");
    profilePic.css("opacity", "0.5");
    fullName.css("color", "rgba(36, 71, 81, 0.5)");
    userName.css("color", "rgba(186, 186, 186, 0.5)")
  })
}
$(document).ready(function(){
  fetchTweets()

//create a hidden flash message that fades in when a condition is met
  let form = $('.container form');
  form.on('submit', function(event) {
     if ($('#textField').val().length < 1){
        event.preventDefault();
        $('.flash').fadeIn(2000).css("display", "inline").fadeOut(2000);
     } else if ($('#textField').val().length >= 140) {
        event.preventDefault();
        $('.flash2').fadeIn(2000).css("display", "inline").fadeOut(2000);
     } else {
    event.preventDefault();
    // console.log($('#textField').val().length)
    $('.tweet-container').empty();
    $.ajax('/tweets', {method: "post", data: $('#textField')})
    .then((result) => {
      fetchTweets()

    })
    .fail((error) => console.error(error))
    }
  })
});

function fetchTweets() {
   $.getJSON('/tweets')
  .then((tweets) => renderTweets(tweets))
}

function renderTweets(tweets) {
  tweets.forEach(function(tweet){
   let newTweet = createTweetElement(tweet)
   $('.tweet-container').prepend(newTweet);
  })
  hover()
}

//create conditional statement if(string is empty ""), else if(too many characters) else (run tweet)
function createTweetElement(twts){
  let userName = twts.user.name;
  let avatarSmall = twts.user.avatars.small;
  let handle = twts.user.handle;
  let content = twts.content.text;
  let created = twts.created_at;

  let newTweet = $(` <article>
                     <header class="tweet-title">
                       <img class="pic" src=${avatarSmall}>
                       <h2 class="fullName"> ${userName}</h2>
                       <h3 class="userName"> ${handle}</h3>
                      </header>
                      <footer class="tweet-body">
                        <p>${content}</p>
                        <h4>${created}</h4>
                          <i class="fa fa-heart fa-lg hover-buttons" aria-hidden="true"></i>
                          <i class="fa fa-retweet fa-lg hover-buttons" aria-hidden="true"></i>
                          <i class="fa fa-flag fa-lg hover-buttons" aria-hidden="true"></i>
                      </footer>
                    </article>`)
return newTweet;
    }