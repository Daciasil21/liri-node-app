var fs = require("fs");
//need to fix
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var command = process.argv[2];

//get info from keys file.
var client = new twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
			access_token_key: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret, 
		});
//twitter needs to know my screen name to pull up my tweets
var params = {screen_name: "yang_dacia"};
//if the item in the second index is 'my-tweets', this will run.
if (command === "my-tweets"){
client.get('statuses/user_timeline', params, function(error, tweets, response) {
          //need to loop through, otherwise will just override latest one.
          if (!error) {
            for (var i = 0; i < tweets.length; i++)
            //tweets is an object. We can access info from tweets using JSON
             {
                console.log("tweets: " + tweets[i].text + "\r\n" +"time: " + tweets[i].created_at);
           			}
       	 }else {
            console.log("Error!");
             }
	});
};
//if the second index item is 'spotify-this-song', then this will run.
if (command === "spotify-this-song") {
		var nodeArgs = process.argv;
// Create an empty variable for holding the song name
		var songName = "";
// Loop through all the words in the node argument
for (var i = 3; i < nodeArgs.length; i++) {
  	if (i > 3 && i < nodeArgs.length) {
    songName = songName + "+" + nodeArgs[i];
    //else and close if
  	}else{
    songName += nodeArgs[i];
  }// close the else
} // close the for loop

spotify.search({ type: 'track', query: songName}, function(err, data) {
    if ( err ) {
        console.log("Error occurred: " + err);
        return;
    }else{
    
    	console.log("Song name is: " + data.tracks.items[0].name + '\r\n' + "Artist is: " + data.tracks.items[0].artists[0].name + "\r\n" + "Album is: " + data.tracks.items[0].album.name + '\r\n' + "Preview: " + data.tracks.items[0].preview_url);
   		 } 
	}); //close the spotify search
}; //close the spotify if command statement

