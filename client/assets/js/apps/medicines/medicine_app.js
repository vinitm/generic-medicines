var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
MedicineManager.module("MedicineApp", function (MedicineApp) {
    console.dir(Marionette.AppRouter.__super__ === Backbone.Router);
   MedicineApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "showSearchOption",
            "show/*id": "showMedicine"
        }
    });

    var API = {
        showSearchOption: function () {
            MedicineApp.Search.Controller.showSearchOption();
        },
        showMedicine: function (id) {
            MedicineManager.execute("add:recentlyViewed", id);
            MedicineApp.Show.Controller.showMedicine(id);
        }
    };


    MedicineManager.on("medicine:search", function () {
        API.showSearchOption();
    });

    MedicineManager.on("medicine:show", function (medicine) {
        MedicineManager.navigate("show/" + encodeURIComponent(medicine));
        API.showMedicine(medicine);
    });


    MedicineManager.addInitializer(function () {
        console.log('MedicineApp.Router initialised');
        new MedicineApp.Router({
            controller: API
        });
    });
});