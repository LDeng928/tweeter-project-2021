/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* a function createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet. */
const createTweetElement = (tweetObject) => {
  // Calculate the year and time difference
  $dateCreated = new Date(tweetObject.created_at);
  $dateToday = new Date();

  $yearDifference = $dateToday.getFullYear() - $dateCreated.getFullYear();
  $timeDifference = Math.abs($dateToday.getTime() - $dateCreated.getTime());
  $dateDifference = Math.ceil($timeDifference / (1000 * 3600 * 24));

  // Each tweet's HTML structure
  let tweet = `
              <div class="tweet-header">
                  <img src="${tweetObject.user.avatars}"/>
                  <span>${tweetObject.user.name}</span>
                  <span>${tweetObject.user.handle}</span>
                </div>
                <article id="tweet">
                  ${tweetObject.content.text}
                </article>
              <div class="tweet-footer">
                <span>${$dateDifference} days ago</span>

                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>`;

  return tweet;
};

const renderTweets = (tweets) => {

  //clear the container before to read all tweets
  $("#tweet-container").empty();

  // loops through tweets from newer to older
  for (let i in tweets) {

    // calls createTweetElement for each tweet
    let tweet = createTweetElement(tweets[i]);
  
    // takes return value and appends it to the tweets container
    $("#tweet-container").prepend(tweet);
  }

};

// Initial load of tweets
const loadTweets = () => {
  $.get("/tweets/", (data, status) => {
    renderTweets(data);
    console.log(status);
  })
};

$(document).ready(function() {
  // Generate each tweet from server
  loadTweets();

  // Submitting new tweet function begins
  // event handler for submitting new tweet
  $("#submitTweet").on("click", function(event) {
    event.preventDefault();

    // get data from form
    $textarea = $(this).closest("form").find("textarea");
    $counter = $(this).closest("form").find(".counter")

    // prepare data for AJAX
    $data = $textarea.serialize();

    // validate text before sending to server
    $text = $textarea.val().trim();

    if ($text === "" || $text === null) {
      alert("Please compose a new tweet");
    } else if ($text.length > 140) {
      alert("Please compose a short tweet");
    }

    // Submit data to server using AJAX
    $.post("/tweets/", $data).done(
      function() {
        loadTweets();
      }
    )

  })
  // Submitting new tweet function ends

});


