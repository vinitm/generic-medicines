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
			MedicineManager.trigger("medicine:show",id);
            MedicineApp.Show.Controller.showMedicine(id);
        }
    };


    MedicineManager.on("medicine:search", function () {
        API.showSearchOption();
    });

    MedicineManager.on("medicine:show", function (medicine) {
	if(MedicineManager.getCurrentRoute()!=="show/" + medicine){//to prevent infinite loop when "medicine:show" triggered from API.showMedicine
        MedicineManager.navigate("show/" + medicine);          //that is when link is directly put , it does not trigger "medicine:show" and recently                                                                       //viewed is not updated
        console.log(medicine);
        API.showMedicine(medicine);							   //so have to trigger it manually
	}
    });


    MedicineManager.addInitializer(function () {
        new MedicineApp.Router({
            controller: API
        });
    });
});