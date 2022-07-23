/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//creates formatted tweet from object data
const createTweetElement = function(data) {
  let $tweet = $(`
      <article class="each-tweet-on-tweeter-feed">
          
            <header class="top-of-tweets">
              <img class="user-avatar" src="${data.user.avatars}"></img>
              ${data.user.name}
              <span class="handle">${data.user.handle}</span>
            </header>
        
            <div class="tweet-content">
              ${data.content.text}
            </div>
          
            <footer class="bottom-of-tweets">
              <span class="leftbottom-of-tweets">
              ${timeago.format(data.created_at)}
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


//appends tweets to container
const renderTweets = function(data) {
  //loops through tweets
  for (const tweet of data) {
    //create tweet element for each tweet
    //takes return value and appends it to the tweets container
    $('.tweeter-feed').append(createTweetElement(tweet));
  }
};

$(document).ready(function() {
  console.log('doc ready');
  //add an event listener for submit
  $("form.tweetSubmit").on("submit", function(event) {
    console.log('tweet received from client, submitting to db');
    // prevent listener's default behaviour
    event.preventDefault();
   
    //form validation
    const maxiumumChars = 140;
    const inputLength = $(this).find("textarea").val().length;

    if (!inputLength) {
      return alert("Please enter a tweet");
    } else if (inputLength - maxiumumChars > 0) {
      return alert("Your tweet is too long");
    } else {
      const newTweet = $(this).serialize();
      $.post("/tweets", newTweet);
    }
       



    //Serialize the form data and send it to the server as a query string.
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then(function(tweet) {
        $('.tweet-text').val('');
      })
      .catch((err) => {
        console.log('POST error: oops, something went wrong', err);
      });
  });


  //define function load tweets
  const loadTweets = function() {
    //responsible for fetching tweets from /tweets page
    //use jQuery to make a request to /tweets and receive the array of tweets as JSON
    $.ajax('/tweets', {
      method: 'GET',
      url: 'http://localhost:8080/tweets',
    })
    //if the request is successful, render the tweets
      .then((tweets) => {
        renderTweets(tweets);
      })
      // catch any errors and log them
      .catch((err) => {
        console.log('GET error: oops, something went wrong', err);
      });
  
  };
  // call load tweets function
  loadTweets();

});


/* resources:
https://stackoverflow.com/questions/17865148/using-jquery-to-prevent-form-submission-when-input-fields-are-empty
*/