var mongoose = require('mongoose');

var ConstituentSchema = mongoose.Schema({
    generic_id: String,
    id: Number,
    name: String,
    qty: Number,
    strength: String
}, {
    _id: false,
    id: false
});

var MedicineSchema = mongoose.Schema({
    brand: String,
    category: String,
    d_class: String,
    generic_id: Number,
    id: Number,
    manufacturer: String,
    package_price: Number,
    package_qty: Number,
    package_type: String,
    unit_price: Number,
    unit_qty: Number,
    unit_type: String
}, {
    _id: false,
    id: false
});

var DetailSchema = mongoose.Schema({
    medicine: MedicineSchema,
    constituents: [ConstituentSchema]
});


var DetailModel = mongoose.model('detail', DetailSchema);

var AlternativeSchema = mongoose.Schema({
    medicine: MedicineSchema,
    constituents: [ConstituentSchema],
    alternatives: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'detail'
        }],
    cheapestAlternatives: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'detail'
        }]
});
 
module.exports = mongoose.model('alternative1234', AlternativeSchema);