


$(document).ready(function () {
  //creating an array of our bands
  var bands = [
    "Nirvana",
    "Weezer",
    "The Killers",
    "System of a Down",
    "Rage Against the Machine",
    "Jimi Hendrix",
    "Excision",
    "Emmure",
    "Tenacious D",
    "Korn",



  ];

  $(document).on("click", ".band", getBands);
  $(document).on("click", ".gif", animate);


  function getBands() {
    $("#gifArea").empty();
    var band = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=8AhSEEgsjxmGfc409YwuAfDo4g1m6iXo&q=" + band + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      for (let i = 0; i < response.data.length; i++) {
       
        
        var bandDiv = $("<div class='bandz'>");
        
        // Storing the rating data
      var rating = response.data[i].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);
      
      // Displaying the rating
      bandDiv.append(pOne);

      // <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif"></img>

      var still = response.data[i].images.original_still.url

      var animated = response.data[i].images.fixed_height.url;

      var newImage = $("<img>").addClass("gif").attr({ "src": still, "data-still": still, "data-state": "still" });

      newImage.attr("data-animate", animated);

      bandDiv.append(newImage);
     
      $("#gifArea").prepend(bandDiv);
    }
      
    })
  };

   function animate() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

  // Function for displaying movie data
  function displayGifButtons() {
    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonArea").empty(); // Here we are erasing to prevent duplication

    // Looping through the array of movies
    for (var i = 0; i < bands.length; i++) {
      // Then dynamicaly generating buttons for each movie in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var gifButton = $("<button>");
      // Adding a class
      gifButton.addClass("band");
      // Adding a data-attribute with a value of the band at i i
      gifButton.attr("data-name", bands[i]);
      // Providing the button's text with a value of the movie at i i
      gifButton.text(bands[i]);
      // Adding the button to the HTML
      $("#buttonArea").append(gifButton);
    }
  }

  // Here we are adding new bands when clicked

  $("#addGif").on("click", function () {
    event.preventDefault();
    var band = $("#bandInput")
      .val()
      .trim();
    console.log(band)
    if (band === "") {
      return; // Here we make sure user can not add a blank button
    }

    bands.push(band)

    displayGifButtons();

  });

  displayGifButtons();
  //Everything will be added in function
});
