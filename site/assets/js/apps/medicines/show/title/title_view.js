MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.Title = Marionette.ItemView.extend({
        template: "#title-template",
        className: "mcard",
        tagName: "div",
        id: "title"
    });
});