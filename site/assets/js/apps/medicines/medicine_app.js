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
        showMedicine: function (medicineId) {
            MedicineApp.Show.Controller.showMedicine(medicineId);
        },
        addRecentlyViewed: function (medicineModel) {
            MedicineManager.execute("add:recentlyViewed", medicineModel);
        }
    };


    MedicineManager.on("medicine:search", function () {
        API.showSearchOption();
    });

    MedicineManager.on("medicine:show", function (medicineModel) {
        MedicineManager.navigate("show/" + medicineModel.getId());
        API.showMedicine(medicineModel.getId());
    });

    MedicineManager.on("medicine:shown", function (medicineModel) {
        API.addRecentlyViewed(medicineModel);
    });

    MedicineManager.addInitializer(function () {
        new MedicineApp.Router({
            controller: API
        });
    });
});