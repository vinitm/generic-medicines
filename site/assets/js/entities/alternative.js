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
        model: Entities.Alternative
    });

    var API = {
        getAlternatives: function (medicine) {
            var alternatives = new Entities.AlternativeCollection();
            alternatives.url = "/medicine_alternatives/?id=" + encodeURIComponent(medicine);
            return alternatives.fetch().then(function() {
            return alternatives;
        });
        }
    };

    MedicineManager.reqres.setHandler("alternative:entities", function (medicine) {
        return API.getAlternatives(medicine);
    });

});