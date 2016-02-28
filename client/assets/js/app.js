    var Backbone = require('backbone');
    var $ = require('jquery');
    var Marionette = require('backbone.marionette');


    var MedicineManager = new Marionette.Application();

    MedicineManager.addRegions({
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
        console.log('history started');
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    $(function () {
        MedicineManager.start();
    });

    module.exports = MedicineManager