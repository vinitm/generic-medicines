MedicineManager.module("MedicineApp.Search", function (Search, MedicineManager, Backbone, Marionette, $, _) {
    Search.Controller = {
        showSearchOption: function () {
            var searchLayout = new Search.SearchLayout();
            searchLayout.on("search:change", this.showSuggestion);
            searchLayout.on("suggestion:select", this.showMedicine);
            MedicineManager.mainRegion.show(searchLayout);
        },
        showMedicine: function (suggestModel) {
            MedicineManager.trigger("medicine:show", suggestModel);
        }
    }
});