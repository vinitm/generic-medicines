var request = require('request-promise');
var url = require('../url.js');
var pathname = '/api/medicine_suggestions/';

/*
[{
    "suggestion": "10 PM (25 mg)"
}]
*/
var options={};
module.exports = function(keyword) {
    var urlStr = url({ pathname: pathname, query: keyword });
    options.url = urlStr;
    return request(options);
};
