var MedicineManager = require('MedicineManager');
var headerChannel = require('backbone.radio').channel('header');
var medicineChannel = require('backbone.radio').channel('medicine');

var Search = require('./search');
var Show = require('./show');
var Router = require('./router');


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
    MedicineManager.navigate("medicines/show/" + encodeURIComponent(medicine));
    API.showMedicine(medicine);
});


MedicineManager.addInitializer(function () {
    new Router({
        controller: API
    });
});