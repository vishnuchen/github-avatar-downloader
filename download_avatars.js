var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": "92baf1e42288fb214177199e0bce0d54b82f7966"
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
   var fs = require ('fs')
   request.get(url).on('error', function(err){
               throw err;
           })
           .on('response', function (response){
               console.log('Response Status Code: ', response.statusCode);
               console.log('Response Status Message: ', response.statusMessage);
               console.log('Response Headers: ', response.headers['content-type']);
           })
           .pipe(fs.createWriteStream(filePath));

}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  console.log("Errors:", err);
  var data = JSON.parse(result);
    for (var i = 0; i < data.length; i++) {
   console.log(data[i].avatar_url);
   var loginData = data[i].login;
   console.log("LOGIN Data", loginData);
   var urlLast = data[i].avatar_url;
   downloadImageByURL(urlLast, `avatars/${loginData}.jpg`);
  }
}); //"avatars/" + loginData + ".jpg"
