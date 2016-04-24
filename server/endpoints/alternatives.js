var request = require('request-promise');
var url = require('../url.js');
var pathname = '/api/medicine_alternatives/';

/*
[{
    "brand": "Lovbebi (25 mg)",
    "category": "Tablet",
    "d_class": "null",
    "generic_id": 66497,
    "id": 49434,
    "manufacturer": "Allied Chemicals & Pharmaceuticals Pvt.Ltd.",
    "package_price": 36,
    "package_qty": 4,
    "package_type": "Tablet",
    "unit_price": 9,
    "unit_qty": 1,
    "unit_type": "Tablet"
}]
*/
var options={};
module.exports = function(keyword) {
    var urlStr = url({ pathname: pathname, query: keyword });
    options.url = urlStr;
    return request(options);
};
