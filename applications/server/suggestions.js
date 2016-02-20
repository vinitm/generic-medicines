var request = require('request');
var key = require('./key.js');
var suggestionsURL = "http://www.truemd.in/api/medicine_suggestions/?key=" + key + "&id=";

var parse = function (jsonStr) {
    var jsonObj=JSON.parse(jsonStr);
    return jsonObj.response.suggestions;
};

module.exports = function (keyword) {
    return new Promise(function (resolve, reject) {
        var query = encodeURIComponent(keyword);
        var url = suggestionsURL + query;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(parse(body));
            } else {
                reject(error);
            }
        });
    });
}