var request = require('request');
var url = require('./url.js');
var pathname = '/api/medicine_alternatives/';

var parse = function(jsonStr) {
    var jsonObj = JSON.parse(jsonStr);
    return jsonObj.response.medicine_alternatives;
};

module.exports = function(keyword) {
    return new Promise(function(resolve, reject) {
        var urlStr = url({ pathname: pathname, query: keyword });
        request(urlStr, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(parse(body));
            } else {
                reject(error);
            }
        });
    });
}
