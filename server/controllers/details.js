var request = require('request-promise');
var url = require('../url.js');
var detailsPathname = '/api/medicine_details/';
var Alternatives = require('./alternatives');

/*
{
    "medicine": {
        "brand": "10 PM (25 mg)",
        "category": "Tablet",
        "d_class": "null",
        "generic_id": 78080,
        "id": 8,
        "manufacturer": "Hallmark Formulations Pharmaceuticals",
        "package_price": 79,
        "package_qty": 4,
        "package_type": "Tablet",
        "unit_price": 19.75,
        "unit_qty": 1,
        "unit_type": "Tablet"
    },
    "constituents": [{
        "generic_id": "78080",
        "id": 84612,
        "name": "Sildenafil",
        "qty": 1,
        "strength": "25 mg\r"
    }]
}
*/


var Details = function () {
    var parse = function (obj) {
        return {
            details: JSON.parse(obj[0]).response,
            alternatives: JSON.parse(obj[1]).response.medicine_alternatives
        };
    };

    var _getDetail = function (keyword) {
        var options = {};
        var urlStr = url({
            pathname: detailsPathname,
            query: keyword
        });
        options.url = urlStr;
        return request(options);
    };

    var _getAlternatives = function (keyword) {
        return Alternatives.get(keyword);
    };

    this.get = function (keyword) {
        var alternativesPromise = _getAlternatives(keyword);
        var detailsPromise = _getDetail(keyword);
        return Promise.all([detailsPromise, alternativesPromise]).then(function (res) {
            return parse(res);
        });
    };
};




module.exports = new Details();