// Read & set any environment variables with dotenv package
require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");


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
        }  
        var artists = data.tracks.items[0].artists;
        for (i=0; i < artists.length; i++) {
            var ArtistName = artists[i].name;
        }
        console.log("=================================");
        console.log(`
        Artist(s): ${ArtistName}
        Song name: ${data.tracks.items[0].name}
        Preview link: ${data.tracks.items[0].preview_url}
        Album: ${data.tracks.items[0].album.name}`);
        console.log("=================================");
        
    });
}

// Do what it says function
function doIt () {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        } 
        var dataArr = data.split(",");
        userSearch = dataArr[1];
        spotifyRequest();
        
    });
}


// Conditionls to call functions based on user input 
if (command === "concert-this") {
    // User input validation
    if (userSearch) {
    bandsRequest();
    } else {
        console.log("Please search for something");
    }
} else if (command === "spotify-this-song") {
    // Conditional search for default song if there is no user input
    if (userSearch) {
    spotifyRequest();
    } else {
        userSearch = "The Sign";
        spotifyRequest();
    }
} else if (command === "movie-this") {
    // Conditional search for default movie if there is no user input 
    if (userSearch) {
    omdbRequest();
    } else {
        userSearch = "Mr. Nobody";
        omdbRequest();
    }
} else if (command === "do-what-it-says") {
    doIt();
} else {
    console.log("Please enter a valid command")
}
 


