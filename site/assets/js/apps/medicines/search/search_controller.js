MedicineManager.module("MedicineApp.Search", function (Search, MedicineManager, Backbone, Marionette, $, _) {
    Search.Controller = {
        showSearchOption: function () {
            var searchLayout = new Search.SearchLayout();
            searchLayout.on("search:change", this.showSuggestion);
            searchLayout.on("suggestion:select", this.showMedicine);
            MedicineManager.mainRegion.show(searchLayout);
        },
        showSuggestion: function (search) {
            MedicineManager.request("suggestion:entities", search).then(function (suggestions) {
                var suggestionsView = new Search.Suggest.Suggestions({
                    collection: suggestions
                });
                MedicineManager.mainRegion.currentView.suggestionRegion.show(suggestionsView);
            });
        },
        showMedicine: function (suggestion) {
            MedicineManager.trigger("medicine:show", suggestion.get("suggestion"));
        }
    }
});