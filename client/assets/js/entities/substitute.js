var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Mutators = require('Backbone.Mutators');
var medicineChannel = require('backbone.radio').channel('medicine');


var Subtitute = Backbone.Model.extend({
    mutators: {
        url: function () {
            return '#medicines/show/' + encodeURI(this.get('brand'));
        }
    },
    default: {
        brand: "",
        category: "",
        d_class: "",
        generic_id: null,
        id: null,
        manufacturer: "",
        package_price: null,
        package_qty: null,
        package_type: "",
        unit_price: null,
        unit_qty: null,
        unit_type: ""
    }
});

var SubtituteCollection = Backbone.Collection.extend({
    model: Subtitute,
    getCheapestSubstitutes: function () {
        var cheapestSubstitutes = [];
        if (this.length === 0)
            return cheapestSubstitutes;
        var priceProperty = "unit_price";
        var cheapestSubstitutePrice = this.models[0].get(priceProperty);
        this.forEach(function (e) {
            var price = e.get(priceProperty);
            if (price < cheapestSubstitutePrice) {
                cheapestSubstitutePrice = price;
                cheapestSubstitutes = [];
                cheapestSubstitutes.push(e);
            } else if (price === cheapestSubstitutePrice) {
                cheapestSubstitutes.push(e);
            }
        });
        return cheapestSubstitutes;
    }
});

module.exports = Marionette.Object.extend({
    initialize: function () {
        medicineChannel.reply("substitute", function (medicine) {
            //return API.getSubtitutes(medicine);
            return SubtituteCollection;
        });
    },
    getSubtitutes: function (medicine) {
        var substitutes = new Entities.SubtituteCollection();
        substitutes.url = "/medicine_substitutes/?id=" + encodeURIComponent(medicine);
        return substitutes.fetch().then(function () {
            return substitutes;
        });
    }
});