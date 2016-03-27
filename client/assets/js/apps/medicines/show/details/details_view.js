var MedicineManager=require('MedicineManager');
var Marionette = require('backbone.marionette');
MedicineManager.module("MedicineApp.Show", function (Show) {
    Show.Details = Marionette.ItemView.extend({
        template: require('./template.tpl'),
        tagName: "div",
        id: "details"
    });
});