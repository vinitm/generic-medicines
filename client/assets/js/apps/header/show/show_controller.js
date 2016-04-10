var MedicineManager = require('MedicineManager');
MedicineManager.module("HeaderApp.Show", function (Show) {
    Show.Controller = {
        showHeader: function () {
            var links = MedicineManager.request("header:entities");
            var headers = new Show.Header({
                collection: links
            });

            headers.on("brand:clicked", function () {
                MedicineManager.trigger("medicine:search");
            });
            headers.on("suggestion:select", this.showMedicine);
            MedicineManager.headerRegion.show(headers);
        },
        showMedicine: function (suggestion) {
            MedicineManager.trigger("medicine:show", suggestion.get("suggestion"));
        },
        setSearchVisibility: function (visible) {
            var searchBar = MedicineManager.headerRegion.currentView.inputRegion.$el;
            if (visible === 'hide')
                searchBar.hide();
            else if (visible === 'show')
                searchBar.show();
        }
    };
});