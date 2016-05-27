var Detail = require('../models/Detail');


/*
{
    "_id": "57482f4e42bf15e00ea28e27",
    "medicine": {
        "brand": "Diprox (250 mg)",
        "category": "Tablet",
        "d_class": "null",
        "generic_id": 110669,
        "id": 27057,
        "manufacturer": "Nexus Biotech",
        "package_price": 62,
        "package_qty": 10,
        "package_type": "Tablet",
        "unit_price": 6.2,
        "unit_qty": 1,
        "unit_type": "Tablet"
    },
    "__v": 0,
    "cheapestAlternatives": [
        {
            "_id": "5730c4ce2bb45c040734793f",
            "medicine": {
                "brand": "Kayval (250 mg)",
                "package_price": 24,
                "package_qty": 10,
                "unit_price": 2.4,
                "unit_qty": 1
            }
}
],
    "alternatives": [
        {
            "_id": "5730b9bf2bb45c0407346077",
            "medicine": {
                "brand": "Cylenc DS (250 mg)",
                "package_price": 35,
                "package_qty": 10,
                "unit_price": 3.5,
                "unit_qty": 1
            }
},
        {
            "_id": "5730ba042bb45c0407346107",
            "medicine": {
                "brand": "D Val ER (250 mg)",
                "package_price": 38,
                "package_qty": 10,
                "unit_price": 3.8,
                "unit_qty": 1
            }
}
],
    "constituents": [
        {
            "generic_id": "110669",
            "id": 135059,
            "name": "Divalproex Sodium",
            "qty": 1,
            "strength": "250 mg\r"
}
]
}
*/

var Details = function () {
    var requiredFields = ['medicine.brand',
                        'medicine.package_price',
                        'medicine.package_qty',
                        'medicine.unit_price',
                        'medicine.unit_qty',
                        '_id'];
    this.get = function (keyword) {
        return Detail.findOne({
            'medicine.brand': keyword
        }).populate('alternatives cheapestAlternatives', requiredFields.join(' ')).exec();
    };
};

module.exports = new Details();