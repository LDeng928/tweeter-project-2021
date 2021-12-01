/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
]

const renderTweets = (tweets) => {

  //clear the container before to read all tweets
  $("#tweet-container").empty();

  // loops through tweets from newer to older
  for (let i in tweets) {

    // calls createTweetElement for each tweet
    let tweet = createTweetElement(tweets[i]);
    console.log(tweet);
    // takes return value and appends it to the tweets container
    $('#tweet-container').prepend(tweet);
  }

}

/* a function createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet. */
const createTweetElement = (tweetObject) => {
  let tweet = (`
              <div class="tweet-header">
                  <img sre="${tweetObject.user.avatar}"/>
                  <span>${tweetObject.user.name}</span>
                  <span>${tweetObject.user.handle}</span>
                </div>
                <article id="tweet">
                  ${tweetObject.content.text}
                </article>
              <div class="tweet-footer">
                <span>10 days ago...</span>

                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>`);

  //console.log(`${tweetObject.content.text}`)
  return tweet;
}


renderTweets(data);

