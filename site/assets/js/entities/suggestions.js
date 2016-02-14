MedicineManager.module("Entities", function (Entities, MedicineManager, Backbone, Marionette, $, _) {
    Entities.Suggestion = Backbone.Model.extend({
        default: {
            "id_s": "default",
            "mrp_s": "-1",
            "auditForm_s": "default",
            "compositionName_s": "default",
            "pack_mrp_s": "-1",
            "form_name_s": "default",
            "isGeneral_s": "default",
            "ProductID_s": "default",
            "name_s": "default",
            "packSize_s": "-1",
            "manufacturer_s": "default"
        },
        getId: function () {
            return this.get('id_s');
        },
        getUnitPrice: function () {
            return this.get('mrp_s');
        },
        getConstituents: function () {
            var arr = this.get('compositionName_s').split('+');
            return arr;
        },
        getPackPrice: function () {
            return this.get('pack_mrp_s');
        },
        getType: function () {
            return this.get('form_name_s');
        },
        getBrandName: function () {
            return this.get('name_s');
        },
        getPackSize: function () {
            return this.get('packSize_s');
        },
        getManufacturer: function () {
            return this.get('manufacturer_s');
        }
    });

    Entities.Suggestions = Backbone.Collection.extend({
        model: Entities.Suggestion
    });
});