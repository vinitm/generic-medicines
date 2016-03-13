var request = require('request');
var bingURL = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1";


module.exports = function () {
    return new Promise(function (resolve, reject) {
        request(bingURL, function (error, response, body) {
            var imageURL='http://www.bing.com/'+JSON.parse(body).images[0].url;
            if (!error && response.statusCode == 200) {
                resolve(imageURL);
            } else {
                reject(error);
            }
        });
    });
}