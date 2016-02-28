var MedicineManager=require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
MedicineManager.module("MedicineApp.Show", function (Show) {
    Show.Title = Marionette.ItemView.extend({
        template: "#title-template",
        tagName: "div",
        id: "title"
    });
});