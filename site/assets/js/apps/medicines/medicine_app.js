MedicineManager.module("MedicineApp", function (MedicineApp, MedicineManager, Backbone, Marionette, $, _) {
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
            MedicineApp.Show.Controller.showMedicine(id);
        }
    };


    MedicineManager.on("medicine:search", function () {
        API.showSearchOption();
    });

    MedicineManager.on("medicine:show", function (medicine) {
        MedicineManager.navigate("show/" + medicine);
        API.showMedicine(medicine);
    });


    MedicineManager.addInitializer(function () {
        new MedicineApp.Router({
            controller: API
        });
    });
});