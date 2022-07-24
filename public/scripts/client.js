/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//prevent cross-site scripting attacks
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//appends tweets to container
const renderTweets = function(data) {
  $('.tweeter-feed').empty();
  //loops through tweets
  for (const tweet of data) {
    //create tweet element for each tweet
    const $tweet = createTweetElement(tweet);
    //takes return value and appends it to the tweets container
    $('.tweeter-feed').append($tweet);
  }
};
  //creates formatted tweet from object data
const createTweetElement = function(data) {
  let $tweet = $(`
       <article class="each-tweet-on-tweeter-feed">
          
             <header class="top-of-tweets">
               <img class="user-avatar" src="${escape(data.user.avatars)}"></img>
                ${escape(data.user.name)}
                <span class="handle">${escape(data.user.handle)}</span>
              </header>
        
              <div class="tweet-content">
                ${escape(data.content.text)}
             </div>
          
             <footer class="bottom-of-tweets">
                <span class="leftbottom-of-tweets">
                ${escape(timeago.format(data.created_at))}
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

//define function load tweets
const loadTweets = function() {
  //responsible for fetching tweets from /tweets page
  //use jQuery to make a request to /tweets and receive the array of tweets as JSON
  $.ajax('/tweets', {
    method: 'GET',
    url: 'http://localhost:8080/tweets',
    dataType: 'json'
  })
    //if the request is successful, render the tweets
    .then((tweets) => {
      renderTweets(tweets.reverse());
    })
    // catch any errors and log them
    .catch((err) => {
      console.log('GET error: oops, something went wrong', err);
    });
  
};
  // call load tweets function
loadTweets();


$(document).ready(function() {




  
  //add an event listener for submit
  $("form.tweetSubmit").on("submit", function(event) {
    console.log('tweet received from client, submitting to db');
    const newTweet = $(this).serialize();

    // prevent listener's default behaviour
    event.preventDefault();
     
    //form validation
    const maxiumumChars = 140;
    const inputLength = $(this).find("textarea").val().length;
   

    if (!inputLength) {
      return alert("Please enter a tweet");
    } else if (inputLength - maxiumumChars > 0) {
      return alert("Your tweet is too long");
    }

    //Serialize the form data and send it to the server as a query string.
    $.ajax('/tweets', {
      method: 'POST',
      data: newTweet,
    })
      .then(function(tweet) {
        $('.tweet-text').val('');
        loadTweets();
      })
      .catch((err) => {
        console.log('POST error: oops, something went wrong', err);
      });
    

  });

});