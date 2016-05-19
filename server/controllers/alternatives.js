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


/*module.exports = function (keyword) {
    var constituentsName = {
        "constituents.name": "Pralidoxime"
    };
    var constituentsStrength = {
        "constituents.strength": "500 mg\r"
    };
    var constituentsSize = {
        "constituents": {
            $size: 1
        }
    };
    var fieldsRequired = {
        "medicine": 1
    };

    return db.details.find({
        $and: [constituentsName, constituentsStrength, constituentsSize]
    }, fieldsRequired);
};*/
var Alternatives = function () {
    var options = {};
    this.get = function (keyword) {
        var urlStr = url({
            pathname: pathname,
            query: keyword
        });
        options.url = urlStr;
        return request(options);
    };
};

module.exports = new Alternatives();