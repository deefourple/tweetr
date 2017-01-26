/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */

$(document).ready(function(){
  fetchTweets()
  $('.compose-button').on('click', function(event) {
    event.preventDefault()
    var composeBox = $('.new-tweet');
    if (composeBox.css("display") === "none"){
    composeBox.slideDown(900);
    $('#textField').focus()
    } else {
      composeBox.slideUp(900);
    }
  });
  let form = $('.container form');
  form.on('submit', function(event) {
     if ($('#textField').val().length === 0){
        event.preventDefault();
        $('.flash').fadeIn(2000).css("display", "inline").fadeOut(2000);
     } else if ($('#textField').val().length > 140) {
        event.preventDefault();
        $('.flash2').fadeIn(2000).css("display", "inline").fadeOut(2000);
     } else {
    event.preventDefault();
    $('.tweet-container').empty();
    $.ajax('/tweets', {method: "post", data: $('#textField')})
    .then((result) => {
      fetchTweets()

    })
    .fail((error) => console.error(error))
    }
    $('#textField').val('')
  })
});

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function fetchTweets() {
   $.getJSON('/tweets')
  .then((tweets) => renderTweets(tweets))
}

function renderTweets(tweets) {
  tweets.forEach(function(tweet){
   let newTweet = createTweetElement(tweet)
   $('.tweet-container').prepend(newTweet);
  })
}



function timeConverter(postTime) {
  let present = Date.now();
  let days = Math.floor((present - postTime) / 86400000);
  if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return `${days} day ago`;
  } else {
    let hours = Math.floor(days / 24);
    if (hours > 1) {
      return `${hours} hours ago`;
    } else if (hours === 1) {
      return `${hours} hour ago`;
    } else {
      return `less than 1 hour ago`;
    }
  }
}

function createTweetElement(twts){
  let userName = twts.user.name;
  let avatarSmall = twts.user.avatars.small;
  let handle = twts.user.handle;
  let content = twts.content.text;
  let created = timeConverter(twts.created_at);

  let newTweet = $(` <article class="tweet">
                     <header class="tweet-title">
                       <img class="pic" src=${avatarSmall}>
                       <h2 class="fullName"> ${escape(userName)}</h2>
                       <h3 class="userName"> ${escape(handle)}</h3>
                      </header>
                      <footer class="tweet-body">
                        <p>${escape(content)}</p>
                        <h4>${created}</h4>
                          <i class="fa fa-heart fa-lg hover-buttons" aria-hidden="true"></i>
                          <i class="fa fa-retweet fa-lg hover-buttons" aria-hidden="true"></i>
                          <i class="fa fa-flag fa-lg hover-buttons" aria-hidden="true"></i>
                      </footer>
                    </article>`)
return newTweet;
    }