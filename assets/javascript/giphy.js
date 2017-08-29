$(document).ready(function () {

    // Initial array of cities to loop through
    var topics = ["Paris", "Dubai", "New York City", "Seoul", "Los Angeles", "Tokyo", "San Diego", "Portland", "Honolulu", "Singapore", "San Francisco", "Sydney", "Seattle", "Bali", "Rome", "Istanbul", "Vancouver", "Mexico City"];
    console.log(topics);
    var state;

    renderButtons(topics);

    // Deleting the initially loaded city buttons prior to adding new city buttons (otherwise we will have repeat buttons)
    function renderButtons(cityArray) {
        console.log("render function is working");
        $("#cityButtons").empty();
        // To loop through the array of topics
        for (var i = 0; i < cityArray.length; i++) {
            var c = $("<button>");
            // Adding a class for the row of buttons created from the array
            c.addClass("citiesReady");
            // Adding a data attribute with a value of the topics at index i
            c.attr("data-name", cityArray[i]);
            // Adding text to the buttons with a value of the topics at index i
            c.text(cityArray[i]);
            $("#cityButtons").append(c);
        }
        console.log("new city array" + cityArray);
    }

    // To allow the user's input from the form to create buttons
    // AKA the "Submit" button
    $("#addCity").on("click", function (event) {
        // "preventDefault" = prevents from refreshing after clicking the "submit" button has been clicked 
        event.preventDefault();
        var cityShown = $("#city-input").val();
        console.log(cityShown);
        topics.push(cityShown);
        console.log(topics);
        renderButtons(topics);
    });
    console.log(topics);

    $(document).on("click", ".citiesReady", function () {
        var city = $(this).attr("data-name");
        // console.log(this);
        // console.log(city);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=ad94bb02f7af4c71ad35b33a437f2aaf&limit=10&rating=pg";

        // Performing an AJAX call to call both the queryURL and "GET" method
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            // The .done function is an AJAX callback that returns after the request from the server has been completed
            .done(function (response) {
                // console.log(response);
                var results = response.data;

                // To loop through the response results generated from the topics array
                for (var i = 0; i < results.length; i++) {
                    // console.log(results[i]);
                    var cityDiv = $("<div id='gifdiv'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var stillGif = results[i].images.fixed_height_still.url;
                    var motionGif = results[i].images.fixed_height.url;
                    var cityImage = $("<img>");

                    cityImage.attr("src", stillGif);
                    cityImage.attr("data-still", stillGif);
                    cityImage.attr("data-animate", motionGif);
                    cityImage.attr("data-state", "still");

                    cityImage.addClass("eachgif");

                    cityDiv.append(cityImage);
                    cityDiv.append(p);

                    $("#cities").append(cityDiv);
                }

            }); // to close the done function

        // To empty the current images and load the new ones when a new button is clicked
        $("#cities").empty();

    }) // to close the button on click function

    $(document).on("click", ".eachgif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

}); // to close the document.ready function