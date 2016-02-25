var MedicineManager=require('MedicineManager');
MedicineManager.module("MedicineApp.Search", function (Search, MedicineManager, Backbone, Marionette, $, _) {
    Search.Controller = {
        showSearchOption: function () {
            var searchLayout = new Search.SearchLayout();
            searchLayout.on("search:change", this.showSuggestion);
            searchLayout.on("suggestion:select", this.showMedicine);
            MedicineManager.mainRegion.show(searchLayout);
        },
        showMedicine: function (suggestion) {
            MedicineManager.trigger("medicine:show", suggestion.get("suggestion"));
        }
    }
});