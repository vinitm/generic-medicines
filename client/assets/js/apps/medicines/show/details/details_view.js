var MedicineManager=require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
MedicineManager.module("MedicineApp.Show", function (Show) {
    Show.Details = Marionette.ItemView.extend({
        template: require('./template.tpl'),
        tagName: "div",
        id: "details"
    });
});