/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
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
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const createTweetElement = function(tweet) {
    let $tweet = $(`
      <article class="each-tweet-on-tweeter-feed">
          
            <header class="top-of-tweets">
              <img class="user-avatar" src="${tweet.user.avatars}"></img>
              ${tweet.user.name}
              <span class="handle">${tweet.user.handle}</span>
            </header>
        
            <div class="tweet-content">
              ${tweet.content.text}
            </div>
          
            <footer class="bottom-of-tweets">

              <span class="leftbottom-of-tweets">
                ${tweet.created_at}
              </span>
            
              <span class="rightbottom-of-tweets">
                <i class="fa-regular fa-flag" id="report"></i>
                <i class="fa-solid fa-repeat" id="retweet"></i>
                <i class="fa-regular fa-heart" id="like"></i>
              </span>

            </footer>
            <!-- end of bottom-of-tweets -->
          </article>
    `);
    return $tweet;
  };
  const renderTweets = function(tweets) {
    //loops through tweets
    for (const tweet of tweets) {
      //create tweet element for each tweet
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
      //takes return value and appends it to the tweets container
      $('.tweeter-feed').append($tweet);
    }
  };

  renderTweets(data);

});


