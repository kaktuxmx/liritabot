require('dotenv').config()

const keys = require('./key.js');
const omdb = require('omdb');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');

// Instructions for User

console.log('THIS IS THE FREAKING LIRI!!!');
console.log('Follow this instructions so you know the amazing things LIRI does ');
console.log('1. You can type "node liri.js my-tweets" this will help you see tweets from kaktuxdev ');
console.log('2. You can type "node liri.js spotify-this-song" and the name of a song-like-this');
console.log('3. You can type "node liri.js movie-this" and the name of a movie-like-this');
console.log('4. You can type "node liri.js "do-what-it-says" and LIRI will take the stuff from random.txt and do it!');

//Global variables for the different funtions and the switch statement that will be soon.
var arg1 = process.argv[2];
var arg2 = process.argv[3];


//This is the Switch statement, that will select 

// do-what-its-says

var wantitaway = function() {
                var songsearch = function() {

                    arg2 = "I Want it That Way";
                    songsearch();

                };

};


// Do Spotify Function
var songsearch = function() {
    var spotify = new Spotify(keys.spotifyKeys);

    spotify.search({type: 'track', query: arg2 }, function(err, data) { 
    if (err) {
        return console.log('Error occurred: ' + err);
    }
        
    console.log('The song name is: ' + data.tracks.items[0].album.name);
    console.log('The artist/group is: ' + data.tracks.items[0].album.artists[0].name); 
        letsdoit();
    });
};

//Do Twitter stuff.
 
var mytweets = function() {

    var client = new Twitter(keys.twitterKeys);
    var params = { screen_name: 'kaktuxdev'};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i=0; i<tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            };
        }
        letsdoit();
    });
};


var showmovie = function () {



    request('http://www.omdbapi.com/?t=' + arg2 +'&apikey='+keys.omdbkey.theapi, function (error, response, body) {
            body = JSON.parse (body);
            console.log('The Movie is:', body.Title);
            console.log('The Year was: ' + body.Year);

    });


}


var letsdoit = function(anotherarg1) { // if 
    switch (anotherarg1){
        case 'my-tweets':
            mytweets();
            break;
        case 'spotify-this-song':
            songsearch();
            break;
        case 'movie-this':
            showmovie();
        case 'do-what-it-says':
            wantitaway();
        break;
        default:
            console.log("What the hell are you doing??? Pick the correct one");
        };

};

if (arg1) {
    letsdoit(arg1);
} else {
    console.log("Need to look the instructins")   
}


