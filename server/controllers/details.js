var Detail = require('../models/Detail');


/*
{
    "_id": "574171e48fd1707811e531bc",
    "medicine": {
        "brand": "Crocin (15 ml)",
        "category": "Drop",
        "d_class": "null",
        "generic_id": 93956,
        "id": 23216,
        "manufacturer": "Glaxo Smithkline Pharmaceuticals Ltd.",
        "package_price": 26.5,
        "package_qty": 15,
        "package_type": "ml",
        "unit_price": 1.77,
        "unit_qty": 1,
        "unit_type": "ml"
    },
    "__v": 0,
    "alternatives": [
        {
            "_id": "57317517cfd8937011c1b9f7",
            "medicine": {
                "brand": "Dolopar (15 ml)",
                "category": "Drop",
                "d_class": "null",
                "generic_id": 119409,
                "id": 27708,
                "manufacturer": "Micro Nova Pharmaceuticals Ltd.",
                "package_price": 23.4,
                "package_qty": 15,
                "package_type": "ml",
                "unit_price": 1.56,
                "unit_qty": 1,
                "unit_type": "ml"
            }
},
        {
            "_id": "5731754acfd8937011c1ba4c",
            "medicine": {
                "brand": "Domitex (15 ml)",
                "category": "Drop",
                "d_class": "null",
                "generic_id": 115480,
                "id": 27903,
                "manufacturer": "Auriga Labs",
                "package_price": 20,
                "package_qty": 15,
                "package_type": "ml",
                "unit_price": 1.33,
                "unit_qty": 1,
                "unit_type": "ml"
            }
}
],
    "constituents": [
        {
            "generic_id": "93956",
            "id": 127768,
            "name": "Paracetamol",
            "qty": 1,
            "strength": "100 mg\r"
}
]
}
*/

var Details = function () {
    this.get = function (keyword) {
        return Detail.findOne({
            'medicine.brand': keyword
        }).populate('alternatives cheapestAlternatives', 'medicine _id').exec();
    };
};

module.exports = new Details();