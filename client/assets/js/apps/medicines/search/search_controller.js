var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
MedicineManager.module("MedicineApp.Search", function (Search) {
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