var MedicineManager = require('MedicineManager');
var Marionette = require('backbone.marionette');
var headerChannel = require('backbone.radio').channel('header');
var medicineChannel = require('backbone.radio').channel('medicine');

var Search = require('./search');
var Show = require('./show');
MedicineManager.module("MedicineApp", function (MedicineApp) {
    MedicineApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "showSearchOption",
            "show/*id": "showMedicine"
        }
    });

    var API = {
        showSearchOption: function () {
            headerChannel.request("set:search:visiblity", 'hide');
            Search.showSearchOption();
        },
        showMedicine: function (id) {
            headerChannel.request("set:search:visiblity", 'show');
            medicineChannel.request("add:recentlyViewed", id);
            Show.showMedicine(id);
        }
    };


    MedicineManager.on("medicine:search", function () {
        MedicineManager.navigate("");
        API.showSearchOption();
    });

    MedicineManager.on("medicine:show", function (medicine) {
        MedicineManager.navigate("show/" + encodeURIComponent(medicine));
        API.showMedicine(medicine);
    });


    MedicineManager.addInitializer(function () {
        new MedicineApp.Router({
            controller: API
        });
    });
});