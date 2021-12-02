/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Utility function to prevent cross-siting scripting
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Utility function to remove error message
const removeErrorMessage = () => {
  $("#message").removeClass("error-message").text("").toggle("slow");
};

const removeSuccessMessage = () => {
  $("#message").removeClass("success-message").text("").toggle("slow");
};

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
            <div class="tweets">
              <div class="tweet-header">
                  <img src="${tweetObject.user.avatars}"/>
                  <span>${tweetObject.user.name}</span>
                  <span>${tweetObject.user.handle}</span>
                </div>
                <article id="tweet">
                  ${escape(tweetObject.content.text)}
                </article>
              <div class="tweet-footer">
                <span>${$dateDifference} days ago</span>

                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </div>`;

  return tweet;
};

const renderTweets = (tweets) => {
  // loops through tweets from newer to older
  for (let i in tweets) {

    // calls createTweetElement for each tweet
    let tweet = createTweetElement(tweets[i]);
  
    // takes return value and appends it to the tweets container
    $(".tweet-container").prepend(tweet);
  }

};

// Initial load of tweets
const loadTweets = () => {
  $.get("/tweets/", (data, status) => {
    renderTweets(data);
    console.log(status);
  });
};

$(document).ready(function() {
  // Generate each tweet from server
  loadTweets();
  $(".new-tweet").find("textarea").focus();
  $("#message").toggle(false);

  // Submitting new tweet function begins
  // event handler for submitting new tweet
  $("#submitTweet").on("click", function(event) {
    event.preventDefault();

    // get data from form
    $textarea = $("#tweet-text");
    console.log($textarea);
    $counter = $(".counter");

    // prepare data for AJAX
    $data = $textarea.serialize();
    console.log($data);
    console.log(typeof $data);

    // validate text before sending to server
    $text = $textarea.val().trim();

    console.log($text);

    if ($text === "" || $text === null || $data === "") {
      $("#message").text("Please compose a tweet").addClass("error-message").toggle("slow");
      
      setTimeout(() => {
        removeErrorMessage();
      }, 3000);
      
    } else if ($text.length > 140) {
      $("#message").text("Please compose a shorter tweet").addClass("error-message").toggle("slow");

      setTimeout(() => {
        removeErrorMessage();
      }, 3000);
    };

    // Submit data to server using AJAX
    $.post("/tweets/", $data).done(
      function() {
        loadTweets();

        $("#message").text("Tweet sent successfully").addClass("success-message").toggle("slow");
        
        setTimeout(() => {
         removeSuccessMessage()
        }, 3000);


      }
    );

    // Reset counter and textarea after submitting
    $counter.text("140").removeClass("redFont");
    $textarea.val("").focus();

  });
  // Submitting new tweet function ends

});


