    var $ = global.jQuery = require('jquery');
    var Backbone = require('backbone');
    var Marionette = require('backbone.marionette');


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

        //set background image
        $.get('/bing_background', function (url) {
            $('html').css('background', 'url(' + url + ') no-repeat center center fixed');
        });
    });

    $(function () {
        MedicineManager.start();
    });

    module.exports = MedicineManager;