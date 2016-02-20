var request = require('request');
var key = require('./key.js');
var detailsURL = "http://www.truemd.in/api/medicine_details/?key=" + key + "&id=";

var parse = function (jsonStr) {
    var jsonObj=JSON.parse(jsonStr);
    return jsonObj.response;
};

module.exports = function (keyword) {
    return new Promise(function (resolve, reject) {
        var query = encodeURIComponent(keyword);
        var url = detailsURL + query;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(parse(body));
            } else {
                reject(error);
            }
        });
    });
}