var request = require('request');
var alternativesURL = 'http://mobile.medplusindia.com/mobilemvc/product/alternatives.mbl?localityInfo={}&';

var parse = function (jsonStr) {
    var jsonObj = JSON.parse(jsonStr);

    if (!jsonObj || !jsonObj.dataObject || Object.keys(jsonObj.dataObject).length == 0)
        return [];

    var arr = jsonObj.dataObject.alternateProducts;
    return arr;
};

module.exports = function (keyword) {
    return new Promise(function (resolve, reject) {
        var query = encodeURIComponent(keyword);
        var url = alternativesURL + 'productIdStr=' + query;
        request.post({
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: url
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(parse(body));
            } else {
                reject(error);
            }
        });
    });
}