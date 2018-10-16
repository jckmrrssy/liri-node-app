// Read & set any environment variables with dotenv package
require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");


// Delcaring variables for user inputs
let command = process.argv[2];
let userSearch = process.argv[3];

// Bands API request function
function bandsRequest () {
    request("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var bandGuy = JSON.parse(body);
            var nextTime = bandGuy[0].datetime;
            console.log("================================");
            var time = moment(nextTime).format("MM/DD/YYYY");
            console.log(`Next upcoming ${userSearch} event: 
            Venue Name: ${bandGuy[0].venue.name}
            Venue Location: ${bandGuy[0].venue.city}, ${bandGuy[0].venue.region}, ${bandGuy[0].venue.country}
            Date of Event: ${time}`);
            console.log("=================================")
        };
    });
}; 

// OMDB API request function
function omdbRequest () {
    request("http://www.omdbapi.com/?apikey=trilogy&t=" + userSearch + "&plot=short", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieGuy = JSON.parse(body);
            console.log("================================");
            console.log(`Results for ${userSearch}: 
            Title: ${movieGuy.Title}
            Year Released: ${movieGuy.Year}
            IMDB Rating: ${movieGuy.imdbRating}
            Rotten Tomatoes Rating: ${movieGuy.Ratings[1].Value}
            Produced in: ${movieGuy.Country}
            Language: ${movieGuy.Language}
            Plot: ${movieGuy.Plot}
            Actors: ${movieGuy.Actors}
            `);
            console.log("================================");
        };
    });
};

// Spotify API request function
function spotifyRequest () {
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: "track",
        query: userSearch,
        limit: 1, 
    }, function(err, data) {
        if (err) {
            return console.log("Error occurred " + err);
        } else {
            console.log("=================================");
            console.log(`
            Artist(s): ${data.tracks.items[0].artists}
            Song name: ${data.tracks.items[0].name}
            Preview link: ${data.tracks.items[0].preview_url}
            Album: ${data.tracks.items[0].album.name}`);
            console.log("=================================");
        }
    });
}



// Conditionls to call functions based on user input 
if (command === "concert-this") {
    bandsRequest();
} else if (command === "spotify-this-song") {
    spotifyRequest();
} else if (command === "movie-this") {
    omdbRequest();
} else if (command === "do-what-it-says") {
    // fs pkg command
} else {
    console.log("Please enter a valid command")
}
 


