/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461116232227
  }
];

var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

function createTweetElement(data) {
  //go through the tweetData and parse the object info and store it in an article tag
  let userName = data.user.name;
  let avatarSmall = data.user.avatars.small;
  let avatarMed = data.user.avatars.regular;
  let avatarLarge = data.user.avatars.large;
  let handle = data.user.handle;
  let content = data.content.text;
  let created = data.created_at;

  const calculatePostDate = function(postDate) {
    let present = Date.now()
    let past = postDate;
    let days = Math.floor((present - past) / 86400000)
    if (days <= 1) {
      return `Posted ${days} day ago`
    } else {
      return `Posted ${days} day's ago`
    }
  }

  return $(`<section class="tweet-container">
              <article>
                <header class="tweet-title">
                  <img class="pic" src=${avatarSmall}>
                  <h2 class="fullName"> ${userName}</h2>
                  <h3 class="userName"> ${handle}</h3>
                </header>
                <footer class="tweet-body">
                  <p>${content}</p>
                  <h4>${calculatePostDate(created)}</h4>
                    <i class="fa fa-heart fa-lg hover-buttons" aria-hidden="true"></i>
                    <i class="fa fa-retweet fa-lg hover-buttons" aria-hidden="true"></i>
                    <i class="fa fa-flag fa-lg hover-buttons" aria-hidden="true"></i>
                </footer>
              </article>
            </section>`)
}

function renderTweets(tweets) {
  tweets.forEach(function(tweet){
   let newTweet = createTweetElement(tweet)
   let $container = $('.container')
   $container.append(newTweet);
  })
}


$(document).ready(function() {

  const $tweet = createTweetElement(tweetData);
  let $container = $('.container')
  $container.append($tweet);
  renderTweets(data)
})