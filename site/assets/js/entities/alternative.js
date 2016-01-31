MedicineManager.module("Entities", function (Entities, MedicineManager, Backbone, Marionette, $, _) {
    Entities.Alternative = Backbone.Model.extend({
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

    Entities.AlternativeCollection = Backbone.Collection.extend({
        model: Entities.Alternative,
        getCheapestSubstitutes: function () {
            if (this.length == 0)
                throw "cannot search empty collection";
            var priceProperty = "unit_price";
            var cheapestSubstitutePrice = this.models[0].get(priceProperty);
            var cheapestSubstitutes = [];
            this.substitutes.forEach(function (e) {
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

    var API = {
        getAlternatives: function (medicine) {
            var alternatives = new Entities.AlternativeCollection();
            alternatives.url = "/medicine_alternatives/?id=" + encodeURIComponent(medicine);
            return alternatives.fetch().then(function () {
                return alternatives;
            });
        }
    };

    MedicineManager.reqres.setHandler("alternative:entities", function (medicine) {
        return API.getAlternatives(medicine);
    });

});