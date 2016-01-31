MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.Details = Marionette.ItemView.extend({
        template: "#details-template",
        className: "mcard",
        tagName: "div",
        id: "details"
    });
});