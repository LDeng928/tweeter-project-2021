$(document).ready(function() {
  $(".new-tweet").on("keyup keypress", "textarea", function() {
    // Get this value from textarea
    $text = $(this).val();
    $charsLeft = 140 - $text.length;

    // Access the DOM and update the counter class value
    $counter = $(this).closest("form").find(".counter");
    $counter.text($charsLeft);

    if ($charsLeft < 0) {
      $counter.addClass("redFont");
    } else {
      $counter.removeClass("redFont");
    }
  })

});
