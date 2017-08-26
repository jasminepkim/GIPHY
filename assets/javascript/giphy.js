// ad94bb02f7af4c71ad35b33a437f2aaf

// BUTTONS ALREADY CREATED FOR USER 
// Initial array of cities to loop through
var topics = ["Paris", "New York City", "Seoul", "Tokyo", "San Diego", "Portland", "Honolulu", "Cape Town"];
console.log(topics);

renderButtons();

function renderButtons() {
// Deleting the city buttons prior to adding new city buttons (otherwise we will have repeat buttons)
$("#cityButtons").empty();
// To loop through the array of cities
for (var i = 0; i < topics.length; i++) {
    var c = $("<button>");
    c.addClass("citiesReady");
    c.attr("data-name", topics[i]);
    c.text(topics[i]);
    $("#cityButtons").append(c);
} 
}

$("#cityButtons").on("click", function (event) {
    event.preventDefault();
    var cityShown = $("#city-input").val().trim();
    topics.push(cityShown);
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of cities
renderButtons();

$("button").on("click", function () {
    var city = $(this).attr("button");
    console.log(this);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=ad94bb02f7af4c71ad35b33a437f2aaf&limit=10";
    // make sure queryURL is set to https or else the app may not work properly when deployed to Github

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var cityImage = $("<img>");
                cityImage.attr("src", results[i].images.fixed_height.url);

                $("#cities").append(cityImage);
            }
        }); //to close the done function

}); //to close the button on click function

