var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
MedicineManager.module("HeaderApp", function (Header) {
    var API = {
        showHeader: function () {
            Header.Show.Controller.showHeader();
        }
    };

    MedicineManager.commands.setHandler("set:active:header", function (name) {
        //MedicineManager.HeaderApp.List.Controller.setActiveHeader(name);
    });

    Header.on("start", function () {
        API.showHeader();
    });
});