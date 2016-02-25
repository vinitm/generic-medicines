var MedicineManager=require('MedicineManager');
MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.Title = Marionette.ItemView.extend({
        template: "#title-template",
        tagName: "div",
        id: "title"
    });
});