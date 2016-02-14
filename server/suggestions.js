var request = require('request');
var suggestionURL = 'http://mobile.medplusindia.com/mobilemvc/product/suggestions.mbl?rows=20&';

var parse = function (jsonStr) {
    var jsonObj = JSON.parse(jsonStr);
    var arr = [];

     if (!jsonObj || !jsonObj.dataObject || Object.keys(jsonObj.dataObject).length == 0)
        return arr;

    var temp = jsonObj.dataObject.product.results;
    Object.keys(temp).forEach(function (key) {
        arr.push(temp[key]);
    });
    return arr;
};

module.exports = function (keyword) {
    return new Promise(function (resolve, reject) {
        var query = encodeURIComponent(new Buffer(keyword).toString('base64'));
        var url = suggestionURL + 'productSearchStr=' + query;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(parse(body));
            } else {
                reject(error);
            }
        });
    });
}