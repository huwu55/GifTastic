$(document).ready(function(){
    var topics = ["harry potter", "hermione granger", "ron weasley", "sorting hat"];
    var api = "&api_key=17ctMBVTuXiYLDebhCDpfFahAxvGFZCK";
    var queryURL; 

    function pushTopic(el){
        var foundTopic = false;
        for(var i = 0; i < topics.length; i++){
            if(el === topics[i]){
                foundTopic = true;
                break;
            }
        }

        if(!foundTopic){
                topics.push(el);
                var newTopic = $("<button>");
                newTopic.attr("type", "button");
                newTopic.text(el);
                $(".topics").append(newTopic);
        }
    }

    function showTopics(){
        for(var i = 0; i < topics.length; i++){
            var newTopic = $("<button>");
            newTopic.attr("type", "button");
            newTopic.text(topics[i]);
            //console.log(newTopic.text());
            $(".topics").append(newTopic);
        }
    }

    function listGifs(topic){
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + api + "&limit=10";
        console.log(queryURL); 
        $("#gifresults").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response){
            console.log(response);
            //var res = response.data;
            //console.log(res.length);
            var results = response.data;
            //console.log(results.length);
            var gifResults = $("#gifresults");
            for(var i = 0; i < results.length; i++){
                var gifDiv = $("<div>");
                gifDiv.attr("class", "gifDiv");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height_still.url)
                    .attr("data-still", results[i].images.fixed_height_still.url)
                    .attr("data-animate", results[i].images.fixed_height.url)
                    .attr("data-state", "still")
                    .attr("class", "gif");
                
                var title = $("<h5>")
                    .text(results[i].title.toUpperCase());

                gifDiv.append(image);
                gifDiv.append(title);
                gifDiv.append(p);
                gifResults.append(gifDiv);
            }

            $(".gif").on("click", function(){
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } 
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }

    showTopics();

    $("button").on("click", function(){
        var parentClass = $(this).parent().attr("class");

        if (parentClass === "search"){
            var input = $("#search").val().trim();

            if(input === "");
            else{
                pushTopic(input);
                listGifs(input);
            }
        }
        else{
            listGifs($(this).text());
        }
    });
        
    
});
