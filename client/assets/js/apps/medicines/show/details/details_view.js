var MedicineManager=require('MedicineManager');
MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.Details = Marionette.ItemView.extend({
        template: "#details-template",
        tagName: "div",
        id: "details"
    });
});