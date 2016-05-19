var url = require('url');
var config = require('./config');
var urlObj = {
    protocol: 'http:',
    slashes: true,
    hostname: 'truemd.in',
    query: {
        key: config.key
    }
};

module.exports = function (obj) {
    //extract data from argument object to local variables
    var pathname = obj.pathname;
    var query = obj.query;

    //set url Object properties
    urlObj.pathname = pathname;
    urlObj.query.id = query;

    //create url string from object
    return url.format(urlObj);
}