var MedicineManager = require('MedicineManager');
var headerChannel = require('backbone.radio').channel('header');
var Header = require('./show_view');
module.exports = {
    showHeader: function () {
        var links = headerChannel.request("header:entities");
        var headers = new Header({
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