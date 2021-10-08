$(() => {

  //return to top Button
  //dissapear
  $("#topButton").hide();
  $(window).scroll(() => {
    if ($(window).scrollTop() > 200) {
      $("#topButton").show();
    } else {
      $("#topButton").hide();
    }
  });
  //scroll to top
  $("#topButton").click(() => {
    console.log("working!");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  //SlideDown tweet form
  const $tweetForm = $("#new-blog-form");
  const $slideDownButton = $("#slide-button");

  $tweetForm.hide();

  $slideDownButton.click(() => {
    $tweetForm.slideToggle("slow");
    $slideDownButton.toggleClass("down");
  });


//ajax request
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET", dataType: "json" })
      .then((tweet) => {
        renderTweets(tweet);
      })
      .catch((err) => {
        console.log(`there was an error: ${err}`);
      });
  };

  loadTweets();
 //escape function to stop <script> from being entered 
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

//create tweet function
  const createTweetElement = (tweets) => {
    const $name = tweets.user.name;
    const $handle = tweets.user.handle;
    const $content = tweets.content.text;
    const safeContent = escape($content);
    const $time = timeago.format(tweets.created_at);

    const $tweet = `
    <article class="tweet">
    <div class="user_info">
      <div class="user">
        <i id="user" class="fab fa-grunt fa-2x"></i>
        <b>${$name}</b>
      </div>
      <strong class="email">${$handle}</strong>
    </div>

    <div>
      <p>${safeContent}</p>
    </div>
    <hr>
    <footer>
    <div> ${$time} </div>
      <div>
        <i class="fas fa-flag fa-xs"></i>
        <i class="fas fa-retweet fa-xs"></i>
        <i class="fas fa-heart fa-xs"></i>
      </div>
    </footer>
  </article>
  `;
    return $tweet;
  };

  //render tweet function 
  const renderTweets = (tweets) => {
    const $tweetContainer = $("#tweets-container");
    $tweetContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  };

  $("#error").hide();
  
  //submit form 
  const $form = $("#new-blog-form");
  const $textarea = $("#tweet-text");
  
  $form.submit(function (event) {
    event.preventDefault();
    console.log("form was submitted");
    
    //error message 
    if (!$textarea.val()) {
      $("#error").slideDown("slow");
      $("#errorMessage").text("!YOU MUST ENTER CHARACTERS IN ORDER TO POST!");
    }

    if ($textarea.val()) {
      $("#error").slideUp("slow");
    }

    if ($textarea.val().length > 140) {
      $("#error").slideDown("slow");
      $("#errorMessage").text(
        "!YOU HAVE EXCEEDED THE MAXIMUM NUMBER OF CHARACTERS ALLOWED!"
      );

      if ($textarea.val().length <= 140) {
        $("#error").slideUp("slow");
      }
      //alert("Content is too long!")
      return;
    }

    const serializedData = $(this).serialize();

    $.post("/tweets", serializedData, (response) => {
      loadTweets();
      $textarea.val("");
    });
  });
});
