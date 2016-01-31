MedicineManager.module("Entities", function (Entities, MedicineManager, Backbone, Marionette, $, _) {
    Entities.Subtitute = Backbone.Model.extend({
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

    Entities.SubtituteCollection = Backbone.Collection.extend({
        model: Entities.Subtitute,
        getCheapestSubstitutes: function () {
            if (this.length == 0)
                throw "cannot search empty collection";
            var priceProperty = "unit_price";
            var cheapestSubstitutePrice = this.models[0].get(priceProperty);
            var cheapestSubstitutes = [];
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

    var API = {
        getSubtitutes: function (medicine) {
            var substitutes = new Entities.SubtituteCollection();
            substitutes.url = "/medicine_substitutes/?id=" + encodeURIComponent(medicine);
            return substitutes.fetch().then(function () {
                return substitutes;
            });
        }
    };

    MedicineManager.reqres.setHandler("substitute:entities", function (medicine) {
        return API.getSubtitutes(medicine);
    });

});