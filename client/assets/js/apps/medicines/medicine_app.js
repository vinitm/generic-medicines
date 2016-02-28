var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
MedicineManager.module("MedicineApp", function (MedicineApp) {
    console.dir(Marionette.AppRouter.__super__);
    console.dir(Backbone.test);
    console.dir(Marionette.test);
    console.dir(Marionette.AppRouter.__super__ === Backbone.Router);
   MedicineApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "showSearchOption",
            "show/*id": "showMedicine"
        }
    });

    var API = {
        showSearchOption: function () {
            console.log('show search option');
            MedicineApp.Search.Controller.showSearchOption();
        },
        showMedicine: function (id) {
            console.log('show ' + id);
            MedicineManager.execute("add:recentlyViewed", id);
            MedicineApp.Show.Controller.showMedicine(id);
        }
    };


    MedicineManager.on("medicine:search", function () {
        API.showSearchOption();
    });

    MedicineManager.on("medicine:show", function (medicine) {
        MedicineManager.navigate("show/" + medicine);
        console.log(medicine);
        API.showMedicine(medicine);
    });


    MedicineManager.addInitializer(function () {
        console.log('MedicineApp.Router initialised');
        /* new Backbone.Router({
             routes:{
             "/": API.showSearchOption,
             "show/*id": API.showMedicine
             }
         });*/
       //window.test=Backbone;
        new MedicineApp.Router({
            controller: API
        });
    });
});