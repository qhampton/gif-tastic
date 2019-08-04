//page variables
var gifs = [];
//DOM elements
var searchInput = $("#userSearch");

//search input brings gifs and stores in array 
$("#search-button").on("click", function (a) {
    //stop refresh
    a.preventDefault();
    //if empty keep cycle
    if (searchInput.val().trim() === "") {
        return;
    } 
    //if input put in array
    else {
        gifs.push(searchInput.val().trim());
    }
    searchInput.val("");
    console.log(gifs);
    //makes a button
    buttonGif();
});

//creating button from input
function buttonGif(){
    //go through array
    for (var i = 0; i < gifs.length; i++){
        //create a button
        var button = $("<button>");
        button.attr("type", "button");
        //adds attribute of input
        button.attr("data-name", gifs[i]);
        //adds class to button for later use
        button.addClass("button-gif");
        //adds input as the button name
        button.text(gifs[i]);
        //puts button in gif area
        $("#gif-buttons").append(button + "<br>");
    }}

//gif button is clicked
$(document).on("click", ".button-gif", function () {
    // Grabbing and storing the data-foundGif property value from the button
    var foundGif = $(this).attr("data-foundGif");

    // Constructing a queryURL using the foundGif name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foundGif + "&api_key=kGhqrzqqqb78foMAWMLfjsOQ7CXPnFXA";
    displayResult(queryURL);
});

//calling requesting to display gifs based on search
function displayResult(query) {
    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag and class
                var resultDiv = $("<div>");
                resultImg.addClass("gif");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var resultImg = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                resultImg.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the resultDiv
                resultDiv.append(p);
                resultDiv.append(resultImg);

                // Prependng the resultDiv to the HTML page in the "#gif-here" div
                $("#gif-here").prepend(resultDiv);
            }
        })
};

    //if you click a gif, it has ability to stop and start gifs based
    $(document).on("click", ".gif", function () {
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
    });