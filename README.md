# liri-node-app

### [Demo](https://drive.google.com/file/d/1tj05p-V68LGbbYE8P2s1lppTng5lPh9f/view)

## What it is
This Node.js application called Liri uses various node packages to make API requests. Users are able search for songs, movies and upcoming band performances and will receive back information about their given search term. Specifically, it requests information from the Bands in Town, Spotify and OMDB API's.

## Why it's useful

This is a quick and easy way to find an upcoming concert of your favorite artist, find out more about that song you heard on the radio, and learn some good movie trivia. 

## How it works

There are four different ways this app can be used:

* __node__ __liri.js__ __concert-this__ `<artist/band name here>` - this will return the next upcoming concert for the searched for artist or band

* __node__ __liri.js__ __movie-this__ `<movie name here>` - this will return information about the searched for movie

* __node__ __liri.js__ __spotify-this-song__ `<song name here>` - this will return information about the searched for song

* __node__ __liri.js__ __do-what-it-says__ - this will read the included random.txt file, and pass through a value to the spotify function, which will run and return song information about the song in the txt file

## If you have questions

This code was written and is maintained soley by Jack Morrissey (@jckmrrssy).

## Future updates
