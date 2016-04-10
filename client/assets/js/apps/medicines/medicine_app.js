var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
MedicineManager.module("MedicineApp", function (MedicineApp) {
    MedicineApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "showSearchOption",
            "show/*id": "showMedicine"
        }
    });

    var API = {
        showSearchOption: function () {
            MedicineManager.execute("set:search:visiblity", 'hide');
            MedicineApp.Search.Controller.showSearchOption();
        },
        showMedicine: function (id) {
            MedicineManager.execute("set:search:visiblity", 'show');
            MedicineManager.execute("add:recentlyViewed", id);
            MedicineApp.Show.Controller.showMedicine(id);
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