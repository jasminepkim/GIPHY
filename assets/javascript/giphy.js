// Initial array of cities to loop through
var topics = ["Paris", "Dubai", "New York City", "Seoul", "Los Angeles", "Tokyo", "San Diego", "Portland", "Honolulu", "Singapore", "San Francisco", "Sydney", "Seattle", "Bali", "Rome", "Istanbul", "Vancouver", "Mexico City"];
console.log(topics);

renderButtons();

// Deleting the initially loaded city buttons prior to adding new city buttons (otherwise we will have repeat buttons)
function renderButtons() {
    $("#cityButtons").empty();
    // To loop through the array of topics
    for (var i = 0; i < topics.length; i++) {
        var c = $("<button>");
        // Adding a class for the row of buttons created from the array
        c.addClass("citiesReady");
        // Adding a data attribute with a value of the topics at index i
        c.attr("data-name", topics[i]);
        // Adding text to the buttons with a value of the topics at index i
        c.text(topics[i]);
        $("#cityButtons").append(c);
    }
}

$(document).ready(function () {

    $("button").on("click", function () {
        var city = $(this).attr("data-name");
        console.log(this);
        console.log(city);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=ad94bb02f7af4c71ad35b33a437f2aaf&limit=10&rating=pg";

        // Performing an AJAX call to call both the queryURL and "GET" method
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            // The .done function is an AJAX callback that returns after the request from the server has been completed
            .done(function (response) {
                console.log(response);
                var results = response.data;
                console.log(response.data);
                // To loop through the response results generated from the topics array
                for (var i = 0; i < results.length; i++) {
                    var cityDiv = $("<div>");
                    // Paragraph tag created for the gif ratings
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    console.log(results[i].rating);
                    // Image tag created for the gifs
                    var cityImage = $("<img>");
                    cityImage.attr("src", results[i].images.fixed_height.url);
                    console.log(results[i].images.fixed_height.url);
                    // To append the ratings and gifs and to update the HTML
                    cityDiv.append(p);
                    cityDiv.append(cityImage);
                    $("#cities").append(cityImage);
                    $("#cities").append(p);
                }

                // Freeze and unfreeze the gifs upon click
                $(".gif").on("click", function () {
                    console.log(this);
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

            }); // to close the done function

        // To empty the current images and load the new ones when a new button is clicked
        $("#cities").empty();

    }) // to close the button on click function

    $("#addCity").on("click", function (event) {
        event.preventDefault();
        var cityShown = $("#city-input").val().trim();
        topics.push(cityShown);
        renderButtons();
    });

}) // to close the document.ready function

// =============================================================================================================



// // Calling the renderButtons function at least once to display the initial list of cities
// renderButtons();

// $("button").on("click", function () {
//     var city = $("#city-input").attr("button");
//     console.log(city);

//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=ad94bb02f7af4c71ad35b33a437f2aaf&limit=10";
//     // make sure queryURL is set to https or else the app may not work properly when deployed to Github

//     $.ajax({
//             url: queryURL,
//             method: "GET"
//         })
//         .done(function (response) {
//             var results = response.data;

//             for (var i = 0; i < results.length; i++) {
//                 var gifDiv = $("<div class='item'>");

//                 var rating = results[i].rating;

//                 var p = $("<p>").text("Rating: " + rating);

//                 var cityImage = $("<img>");
//                 cityImage.attr("src", results[i].images.fixed_height.url);

//                 $("#cities").append(cityImage);
//             }
//         }); //to close the done function

// }); //to close the button on click function