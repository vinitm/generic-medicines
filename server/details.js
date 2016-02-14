var request = require('request');
var detailsURL = 'http://mobile.medplusindia.com/mobilemvc/product/information.mbl?localityInfo={}&';

var parse = function (jsonStr) {
    var jsonObj = JSON.parse(jsonStr);

     if (!jsonObj || !jsonObj.dataObject || Object.keys(jsonObj.dataObject).length == 0)
        return {};

    var details = jsonObj.dataObject.product;
    return details;
};

module.exports = function (keyword) {
    return new Promise(function (resolve, reject) {
        var query = encodeURIComponent(keyword);
        var url = detailsURL + 'productIdStr=' + query;
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