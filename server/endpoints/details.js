var request = require('request-promise');
var url = require('../url.js');
var pathname = '/api/medicine_details/';

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

var options={};
module.exports = function(keyword) {
    var urlStr = url({ pathname: pathname, query: keyword });
    options.url = urlStr;
    return request(options);
};
