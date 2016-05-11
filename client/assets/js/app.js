var $ = global.jQuery = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var HeaderApp = require('./apps/header/header_app.js');

var MedicineManager = new Marionette.Application();

MedicineManager.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region"
});

MedicineManager.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

MedicineManager.getCurrentRoute = function () {
    return Backbone.history.fragment;
};

MedicineManager.on("start", function () {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

$(function () {
    new HeaderApp({
        region: MedicineManager.headerRegion
    });
    MedicineManager.start();
});

module.exports = MedicineManager;